import "server-only";
import { SITE_INFO, type Site } from "@/lib/sites";

/**
 * Sends email through Resend (https://resend.com) from each site's own domain, once its key is set
 * (RESEND_API_KEY_WEDDING / RESEND_API_KEY_RCC) and the domain is verified there. Without a key it does nothing and returns false: submissions are still saved and shown
 * on the /edit inbox, so nothing is lost while email is being set up.
 */
const FROM: Record<Site, string> = {
  wedding: process.env.MAIL_FROM_WEDDING ?? "Thoroughly Modern Minnie <hello@thoroughlymodernminnie.co.uk>",
  rcc: process.env.MAIL_FROM_RCC ?? "RCC Workshops <bookings@schoolresilienceworkshop.com>",
};

export async function sendMail(site: Site, msg: { to: string; subject: string; html: string; replyTo?: string }) {
  // one Resend account per business (each free plan verifies one domain); RESEND_API_KEY covers both if only one is set
  const key = (site === "wedding" ? process.env.RESEND_API_KEY_WEDDING : process.env.RESEND_API_KEY_RCC) || process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM[site], to: [msg.to], subject: msg.subject, html: msg.html, ...(msg.replyTo ? { reply_to: msg.replyTo } : {}) }),
  });
  return res.ok;
}

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
}

/** Footer for every email: a link back to the site. (Replies are handled by the Reply-To header.) */
export function emailFooter(site: Site) {
  const { name, url } = SITE_INFO[site];
  return `<hr style="border:0;border-top:1px solid #ddd;margin:24px 0 12px"><p style="margin:0;color:#555;font-size:13px">${escapeHtml(name)} · <a href="${url}" style="color:#555">${url.replace("https://", "")}</a></p>`;
}
