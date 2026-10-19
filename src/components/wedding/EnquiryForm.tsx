"use client";

import { useActionState } from "react";
import { TrackLead } from "@/components/Analytics";
import { submitForm, type FormState } from "@/app/actions";
import { Field, SpamTraps } from "@/components/FormBits";

const INPUT = "w-full rounded border border-wine/20 bg-white px-3 py-2 text-lg outline-none focus:border-rose";
const TYPES = ["Wedding", "Vow renewal", "Elopement / intimate wedding", "LGBTQ+ ceremony", "Cultural / interfaith ceremony", "Commitment ceremony", "Legal-only ceremony", "Not sure yet"];

export function EnquiryForm({ thanks }: { thanks: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm.bind(null, "wedding"), { ok: false });
  if (state.ok)
    return (
      <p role="status" className="mt-10 rounded-lg bg-white p-6 text-center text-xl text-wine">
        {thanks}
        <TrackLead form="wedding-enquiry" />
      </p>
    );
  const v = state.fields ?? {};
  return (
    <form action={action} className="relative mt-10 space-y-5 rounded-lg bg-white p-6 shadow-sm">
      <SpamTraps />
      <Field name="name" label="Your name(s)" required defaultValue={v.name} inputClass={INPUT} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label="Email" type="email" required defaultValue={v.email} inputClass={INPUT} />
        <Field name="phone" label="Phone" type="tel" defaultValue={v.phone} inputClass={INPUT} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="date" label="Wedding date" type="date" defaultValue={v.date} inputClass={INPUT} hint="Leave blank if you haven't set one yet" />
        <Field name="location" label="Venue / location" defaultValue={v.location} inputClass={INPUT} />
      </div>
      <label className="block">
        <span className="mb-1 block font-medium">Type of ceremony</span>
        <select name="type" defaultValue={v.type ?? ""} className={INPUT}>
          <option value="">Choose…</option>
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <Field name="message" label="Tell me about your plans" rows={6} defaultValue={v.message} inputClass={INPUT} />
      {state.error && (
        <p role="alert" className="text-red-700">
          {state.error}
        </p>
      )}
      <button disabled={pending} className="rounded bg-rose px-8 py-2.5 text-lg text-white hover:bg-wine disabled:opacity-60">
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
