"use server";

import { adminClient } from "@/lib/supabase/admin";
import { escapeHtml, sendMail } from "@/lib/email";
import { getContent } from "@/lib/content/get";
import type { Site } from "@/lib/sites";

export type FormState = { ok: boolean; error?: string; fields?: Record<string, string> };

/** Field names → labels, in the order they're shown in the email and the inbox. */
const FORMS: Record<Site, { kind: "enquiry" | "booking"; required: string[]; fields: Record<string, string> }> = {
  wedding: {
    kind: "enquiry",
    required: ["name", "email"],
    fields: {
      name: "Your name(s)",
      email: "Email",
      phone: "Phone",
      date: "Wedding date",
      location: "Venue / location",
      type: "Type of ceremony",
      message: "Tell me about your plans",
    },
  },
  rcc: {
    kind: "booking",
    required: ["school", "name", "email"],
    fields: {
      school: "School name",
      address: "School address",
      name: "Contact name",
      role: "Contact role",
      email: "Email",
      phone: "Phone number",
      date: "Preferred date / time",
      ages: "Age of students",
      size: "Size of group",
      goals: "Learning goals",
      interests: "Areas of interest",
    },
  },
};

/** An enquiry (wedding) or booking request (RCC): saved, then emailed to Minnie. */
export async function submitForm(site: Site, _prev: FormState, formData: FormData): Promise<FormState> {
  const form = FORMS[site];
  if (!form) return { ok: false, error: "Unknown form." };
  const values: Record<string, string> = {};
  for (const k of Object.keys(form.fields)) values[k] = String(formData.get(k) ?? "").trim().slice(0, k === "message" || k === "goals" ? 5000 : 300);

  // spam: a hidden field people never fill in, and forms sent within 3 seconds of loading
  const startedAt = Number(formData.get("t") ?? 0);
  if (String(formData.get("website") ?? "") || (startedAt && Date.now() - startedAt < 3000)) return { ok: true };

  const missing = form.required.filter((k) => !values[k]);
  if (missing.length) return { ok: false, error: `Please fill in: ${missing.map((k) => form.fields[k]).join(", ")}.`, fields: values };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) return { ok: false, error: "Please check your email address.", fields: values };

  const { error } = await adminClient()
    .from("submissions")
    .insert({ site, kind: form.kind, name: values.name, email: values.email.toLowerCase(), data: values });
  if (error) return { ok: false, error: "Sorry, that didn't send. Please try again, or email directly.", fields: values };

  const c = await getContent(site);
  const rows = Object.entries(form.fields)
    .filter(([k]) => values[k])
    .map(([k, label]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(values[k]).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  // to Minnie, plus a separate copy to anyone in MAIL_COPY_TO (comma-separated, set in Netlify; used for testing)
  const copies = (process.env.MAIL_COPY_TO ?? "").split(",").map((x) => x.trim()).filter(Boolean);
  await Promise.all(
    [c["contact.email"], ...copies].map((to) =>
      sendMail(site, {
        to,
        replyTo: values.email,
        subject: site === "wedding" ? `New enquiry from ${values.name}` : `Booking request: ${values.school}`,
        html: `<p>${site === "wedding" ? "A new enquiry from your website." : "A new workshop booking request from your website."} Reply to this email to answer them directly.</p><table>${rows}</table>`,
      }).catch(() => false),
    ),
  );
  return { ok: true };
}
