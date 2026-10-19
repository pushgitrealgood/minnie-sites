"use client";

import { useActionState } from "react";
import { submitForm, type FormState } from "@/app/actions";
import { Field, SpamTraps } from "@/components/FormBits";

const INPUT = "w-full rounded border border-slate-300 bg-white px-3 py-2 outline-none focus:border-royal";

export function BookingForm({ thanks }: { thanks: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm.bind(null, "rcc"), { ok: false });
  if (state.ok)
    return (
      <p role="status" className="rounded-lg border border-slate-200 bg-mist p-6 text-center text-lg">
        {thanks}
      </p>
    );
  const v = state.fields ?? {};
  return (
    <form action={action} className="relative space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <SpamTraps />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="school" label="School name" required defaultValue={v.school} inputClass={INPUT} />
        <Field name="address" label="School address" defaultValue={v.address} inputClass={INPUT} />
        <Field name="name" label="Contact name" required defaultValue={v.name} inputClass={INPUT} />
        <Field name="role" label="Contact role" defaultValue={v.role} inputClass={INPUT} hint="e.g. Head of Year 6, PSHE lead" />
        <Field name="email" label="Email" type="email" required defaultValue={v.email} inputClass={INPUT} />
        <Field name="phone" label="Phone number" type="tel" defaultValue={v.phone} inputClass={INPUT} />
        <Field name="date" label="Preferred date / time" defaultValue={v.date} inputClass={INPUT} hint="A date, or a few options" />
        <Field name="ages" label="Age of students" defaultValue={v.ages} inputClass={INPUT} hint="e.g. Year 6, or KS3" />
        <Field name="size" label="Size of group" defaultValue={v.size} inputClass={INPUT} />
      </div>
      <Field name="goals" label="Learning goals" rows={3} defaultValue={v.goals} inputClass={INPUT} />
      <Field name="interests" label="Areas of interest" rows={2} defaultValue={v.interests} inputClass={INPUT} hint="Resilience, confidence, critical thinking, or anything specific" />
      {state.error && (
        <p role="alert" className="text-red-700">
          {state.error}
        </p>
      )}
      <button disabled={pending} className="rounded bg-coral px-8 py-2.5 font-semibold text-white hover:bg-royal disabled:opacity-60">
        {pending ? "Sending…" : "Send booking request"}
      </button>
    </form>
  );
}
