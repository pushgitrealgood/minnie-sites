"use client";

import { useState } from "react";
import { browserClient } from "@/lib/supabase/browser";
import type { Site } from "@/lib/sites";
import { uploadPath } from "@/lib/upload-path";

type Field = { name: string; label: string; long?: boolean; image?: boolean };

/** The fields of each editable list. */
export const LIST_FIELDS: Record<string, Field[]> = {
  testimonials: [
    { name: "quote", label: "Quote", long: true },
    { name: "author", label: "Name" },
    { name: "role", label: "Role (e.g. Year 6 Teacher)" },
    { name: "place", label: "Place" },
    { name: "image", label: "Photo", image: true },
  ],
  faqs: [
    { name: "q", label: "Question" },
    { name: "a", label: "Answer", long: true },
  ],
  caseStudies: [
    { name: "school", label: "School (and town)" },
    { name: "title", label: "Headline, e.g. “Year 6 transition: calmer, more confident pupils”" },
    { name: "summary", label: "What the school wanted, and what we did", long: true },
    { name: "outcome", label: "What changed", long: true },
    { name: "quote", label: "Quote from a teacher (optional)", long: true },
    { name: "image", label: "Photo (optional)", image: true },
  ],
  activities: [
    { name: "title", label: "Activity" },
    { name: "how", label: "How it works", long: true },
    { name: "why", label: "Why?", long: true },
  ],
};

/** Add, change, reorder and remove the items of a list (testimonials, FAQs, activities). */
export function ListEditor({
  site,
  listKey,
  initial,
  onDone,
  onCancel,
}: {
  site: Site;
  listKey: string;
  initial: Record<string, string>[];
  onDone: (items: Record<string, string>[]) => void;
  onCancel: () => void;
}) {
  // testimonials differ per site: name + photo on the wedding site, role + place on RCC
  const fields = LIST_FIELDS[listKey].filter((f) => listKey !== "testimonials" || (site === "wedding" ? !["role", "place"].includes(f.name) : f.name !== "author"));
  const [items, setItems] = useState(initial.map((it) => ({ ...it })));
  const [uploading, setUploading] = useState<number | null>(null);
  const set = (i: number, name: string, value: string) => setItems((xs) => xs.map((x, j) => (j === i ? { ...x, [name]: value } : x)));
  const move = (i: number, d: number) =>
    setItems((xs) => {
      const ys = [...xs];
      const [x] = ys.splice(i, 1);
      ys.splice(Math.max(0, Math.min(ys.length, i + d)), 0, x);
      return ys;
    });

  async function upload(i: number, name: string, file: File) {
    setUploading(i);
    const supabase = browserClient();
    const path = uploadPath(site, listKey, file.name);
    const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type });
    if (!error) set(i, name, supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
    setUploading(null);
  }

  return (
    <div>
      <div className="max-h-[65vh] space-y-3 overflow-y-auto pr-1">
        {items.map((it, i) => (
          <div key={i} className="rounded border border-neutral-200 p-3">
            <div className="mb-2 flex items-center gap-1 text-neutral-500">
              <span className="mr-auto font-semibold text-neutral-800">#{i + 1}</span>
              <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded px-2 hover:bg-neutral-100 disabled:opacity-30" aria-label="Move up">
                ↑
              </button>
              <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="rounded px-2 hover:bg-neutral-100 disabled:opacity-30" aria-label="Move down">
                ↓
              </button>
              <button onClick={() => confirm("Remove this item?") && setItems((xs) => xs.filter((_, j) => j !== i))} className="rounded px-2 text-red-700 hover:bg-red-50">
                Remove
              </button>
            </div>
            <div className="space-y-2">
              {fields.map((f) => (
                <label key={f.name} className="block">
                  <span className="text-neutral-600">{f.label}</span>
                  {f.image ? (
                    <span className="mt-1 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {it[f.name] && <img src={it[f.name]} alt="" className="h-14 w-14 rounded object-cover" />}
                      <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(i, f.name, e.target.files[0])} />
                      {uploading === i && <span className="text-neutral-500">Uploading…</span>}
                    </span>
                  ) : f.long ? (
                    <textarea value={it[f.name] ?? ""} onChange={(e) => set(i, f.name, e.target.value)} rows={4} className="mt-1 w-full rounded border border-neutral-300 p-2" />
                  ) : (
                    <input value={it[f.name] ?? ""} onChange={(e) => set(i, f.name, e.target.value)} className="mt-1 w-full rounded border border-neutral-300 px-2 py-1.5" />
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={() => setItems((xs) => [...xs, Object.fromEntries(fields.map((f) => [f.name, ""]))])} className="rounded border border-neutral-300 px-3 py-1.5 hover:bg-neutral-50">
          + Add
        </button>
        <span className="ml-auto" />
        <button onClick={onCancel} className="rounded px-3 py-1.5 hover:bg-neutral-100">
          Cancel
        </button>
        <button onClick={() => onDone(items.filter((it) => Object.values(it).some((v) => v.trim())))} disabled={uploading !== null} className="rounded bg-blue-600 px-4 py-1.5 font-semibold text-white disabled:opacity-40">
          Done
        </button>
      </div>
    </div>
  );
}
