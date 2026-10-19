"use client";

import { useState, useTransition } from "react";
import { updateSubmission } from "./actions";

export type Submission = {
  id: string;
  site: "wedding" | "rcc";
  kind: "enquiry" | "booking" | "download";
  name: string;
  email: string;
  data: Record<string, string>;
  status: string;
  notes: string;
  created_at: string;
};

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  date: "Date",
  location: "Venue / location",
  type: "Ceremony",
  message: "Message",
  school: "School",
  address: "Address",
  role: "Role",
  ages: "Ages",
  size: "Group size",
  goals: "Learning goals",
  interests: "Areas of interest",
  resource: "Downloaded",
};
const STATUSES = ["new", "replied", "booked", "done", "archived"];
const SITE_NAME = { wedding: "Wedding", rcc: "RCC" };

/** Enquiries and booking requests from both sites, newest first, with a status and private notes. */
export function Inbox({ items }: { items: Submission[] }) {
  const [filter, setFilter] = useState<"open" | "all">("open");
  const shown = items.filter((s) => filter === "all" || !["done", "archived"].includes(s.status));
  if (!items.length) return <p className="rounded-lg border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500">Nothing yet. New enquiries and booking requests will appear here (and in your email).</p>;
  return (
    <div className="space-y-3">
      <div className="flex gap-2 text-sm">
        {(["open", "all"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 ${filter === f ? "bg-neutral-900 text-white" : "bg-white text-neutral-600 ring-1 ring-neutral-200"}`}>
            {f === "open" ? "To do" : "All"}
          </button>
        ))}
      </div>
      {shown.map((s) => (
        <Item key={s.id} s={s} />
      ))}
    </div>
  );
}

function Item({ s }: { s: Submission }) {
  const [status, setStatus] = useState(s.status);
  const [notes, setNotes] = useState(s.notes);
  const [saved, setSaved] = useState(true);
  const [pending, start] = useTransition();
  const save = (st = status, n = notes) =>
    start(async () => {
      const r = await updateSubmission(s.id, st, n);
      setSaved(!("error" in r && r.error));
    });
  return (
    <details className="rounded-lg border border-neutral-200 bg-white" open={status === "new"}>
      <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3">
        <span className={`rounded px-1.5 py-0.5 text-xs ${s.site === "wedding" ? "bg-pink-100 text-pink-900" : "bg-blue-100 text-blue-900"}`}>{SITE_NAME[s.site]}</span>
        {s.kind === "download" && <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-900">Free download</span>}
        <span className="font-medium">{s.site === "rcc" && s.data.school ? `${s.data.school} · ${s.name}` : s.name}</span>
        <span className="text-sm text-neutral-500">{new Date(s.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</span>
        <span className={`ml-auto rounded-full px-2 py-0.5 text-xs ${status === "new" ? "bg-amber-100 text-amber-900" : "bg-neutral-100 text-neutral-600"}`}>{status}</span>
      </summary>
      <div className="space-y-3 border-t border-neutral-100 px-4 py-3 text-sm">
        <dl className="grid gap-x-4 gap-y-1 sm:grid-cols-[140px_1fr]">
          {Object.entries(s.data)
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-neutral-500">{LABELS[k] ?? k}</dt>
                <dd className="whitespace-pre-wrap">{k === "email" ? <a href={`mailto:${v}`} className="text-blue-700 underline">{v}</a> : k === "phone" ? <a href={`tel:${v.replace(/\s/g, "")}`} className="text-blue-700 underline">{v}</a> : v}</dd>
              </div>
            ))}
        </dl>
        <div className="flex flex-wrap items-center gap-2">
          <a href={`mailto:${s.email}`} className="rounded bg-neutral-900 px-3 py-1.5 text-white">
            Reply by email
          </a>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              save(e.target.value, notes);
            }}
            className="rounded border border-neutral-300 px-2 py-1.5"
          >
            {STATUSES.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          {pending && <span className="text-neutral-400">Saving…</span>}
          {!saved && <span className="text-red-700">Couldn’t save</span>}
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => notes !== s.notes && save()}
          rows={2}
          placeholder="Private notes"
          className="w-full rounded border border-neutral-300 px-2 py-1.5"
        />
      </div>
    </details>
  );
}
