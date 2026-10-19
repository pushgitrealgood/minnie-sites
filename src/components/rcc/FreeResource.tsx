"use client";

import { useActionState } from "react";
import { TrackLead } from "@/components/Analytics";
import { submitDownload, type DownloadState } from "@/app/actions";
import { Field, SpamTraps } from "@/components/FormBits";
import { E } from "@/components/Editable";

const INPUT = "w-full rounded border border-slate-300 bg-white px-3 py-2 text-navy outline-none focus:border-royal";

/** Name + email (+ school) for the free PDF; the download link appears straight away. */
export function FreeResourceForm({ button, thanks, fileLabel }: { button: string; thanks: string; fileLabel: string }) {
  const [state, action, pending] = useActionState<DownloadState, FormData>(submitDownload, { ok: false });
  if (state.ok && state.file)
    return (
      <div role="status" className="rounded-lg bg-white p-6 text-navy">
        <p>{thanks}</p>
        <a href={state.file} target="_blank" rel="noopener" className="mt-4 inline-block rounded bg-coral px-6 py-2.5 font-semibold text-white hover:bg-royal">
          ⬇ {fileLabel}
        </a>
        <TrackLead form="rcc-download" />
      </div>
    );
  const v = state.fields ?? {};
  return (
    <form action={action} className="relative space-y-4 rounded-lg bg-white p-6 text-navy">
      <SpamTraps />
      <Field name="name" label="Your name" required defaultValue={v.name} inputClass={INPUT} />
      <Field name="email" label="School email" type="email" required defaultValue={v.email} inputClass={INPUT} />
      <Field name="school" label="School" defaultValue={v.school} inputClass={INPUT} />
      {state.error && (
        <p role="alert" className="text-red-700">
          {state.error}
        </p>
      )}
      <button disabled={pending} className="w-full rounded bg-coral px-6 py-2.5 font-semibold text-white hover:bg-royal disabled:opacity-60">
        {pending ? "Sending…" : <E k="resource.button">{button}</E>}
      </button>
      <p className="text-sm text-slate">We&apos;ll only use your email to send this and the occasional update about workshops. Unsubscribe any time.</p>
    </form>
  );
}
