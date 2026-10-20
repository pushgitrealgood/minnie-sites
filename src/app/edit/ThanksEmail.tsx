"use client";

import { useState, useTransition } from "react";
import { saveContent } from "./actions";
import type { Site } from "@/lib/sites";

const INPUT = "mt-1 w-full rounded border border-neutral-300 px-2 py-1.5";

/** The automatic thank-you email for one site: on/off, subject and message. */
export function ThanksEmail({ site, name, initial }: { site: Site; name: string; initial: { on: boolean; subject: string; text: string } }) {
  const [v, setV] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [status, setStatus] = useState("");
  const [pending, start] = useTransition();
  const dirty = v.on !== saved.on || v.subject !== saved.subject || v.text !== saved.text;
  const save = (next = v) =>
    start(async () => {
      const r = await saveContent(site, { "email.thanksOn": next.on, "email.thanksSubject": next.subject.trim(), "email.thanksText": next.text.trim() });
      setStatus("error" in r && r.error ? r.error : "Saved");
      if (!("error" in r && r.error)) setSaved(next);
    });

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 text-sm">
      <div className="flex items-center gap-3">
        <h3 className="font-semibold">{name}</h3>
        <label className="ml-auto flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={v.on}
            onChange={(e) => {
              const next = { ...v, on: e.target.checked };
              setV(next);
              save(next);
            }}
          />
          {v.on ? "On" : "Off"}
        </label>
      </div>
      <p className="mt-1 text-neutral-500">
        {v.on ? "Everyone who sends the form gets this email, with a copy of what they sent. If they reply, it comes to your email." : "Switched off: people only see the thank-you message on the website."}
      </p>
      {v.on && (
        <div className="mt-3 space-y-3">
          <label className="block">
            <span className="text-neutral-600">Subject</span>
            <input value={v.subject} onChange={(e) => setV({ ...v, subject: e.target.value })} className={INPUT} />
          </label>
          <label className="block">
            <span className="text-neutral-600">Message</span> <span className="text-neutral-400">(“Hi [their name],” is added at the top)</span>
            <textarea value={v.text} onChange={(e) => setV({ ...v, text: e.target.value })} rows={4} className={INPUT} />
          </label>
          <div className="flex items-center gap-3">
            <button onClick={() => save()} disabled={pending || !dirty || !v.subject.trim() || !v.text.trim()} className="rounded bg-neutral-900 px-4 py-1.5 text-white disabled:opacity-40">
              {pending ? "Saving…" : "Save"}
            </button>
            {status && !dirty && <span className="text-neutral-500">{status}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
