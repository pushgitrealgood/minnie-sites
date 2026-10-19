"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { browserClient } from "@/lib/supabase/browser";
import { rawContent, saveContent } from "@/app/edit/actions";
import { SITE_INFO, type Site } from "@/lib/sites";
import { uploadPath } from "@/lib/upload-path";
import { LIST_FIELDS, ListEditor } from "./ListEditor";

type Raw = Record<string, unknown>;

/**
 * Edit mode on the real pages. Does nothing for visitors. When Minnie is signed in (as an editor), everything marked
 * with data-k (components/Editable.tsx) becomes editable: short text in place, longer text in a box, pictures by
 * clicking, lists in a panel. Changes collect in the bar at the bottom until she presses Save.
 */
export function EditMode({ site }: { site: Site }) {
  const router = useRouter();
  const [raw, setRaw] = useState<Raw | null>(null);
  const [changes, setChanges] = useState<Raw>({});
  const [box, setBox] = useState<{ key: string; value: string } | null>(null);
  const [list, setList] = useState<string | null>(null);
  const [status, setStatus] = useState<"" | "saving" | "saved" | "uploading" | string>("");
  const fileInput = useRef<HTMLInputElement>(null);
  const imageKey = useRef<string | null>(null);

  // signed in as an editor? then load the editable text as currently saved
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const supabase = browserClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      const { data: ok } = await supabase.rpc("is_editor");
      if (!ok) return;
      const content = await rawContent(site);
      if (!cancelled && content) setRaw(content);
    })();
    return () => {
      cancelled = true;
    };
  }, [site]);

  // the latest changes for the click handlers, so typing doesn't re-run the edit-mode setup below
  const changesRef = useRef<Raw>({});
  useEffect(() => {
    changesRef.current = changes;
  }, [changes]);
  const change = useCallback((key: string, value: unknown) => setChanges((c) => ({ ...c, [key]: value })), []);

  // switch the page into edit mode
  useEffect(() => {
    if (!raw) return;
    document.body.dataset.editing = "";
    const texts = [...document.querySelectorAll<HTMLElement>('[data-k-kind="text"]')];
    for (const el of texts) {
      el.contentEditable = "plaintext-only";
      el.spellcheck = true;
    }
    const onInput = (e: Event) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-k-kind="text"]');
      if (el?.dataset.k) change(el.dataset.k, el.innerText.trim());
    };
    // clicks: links inside editable bits mustn't navigate; long text, pictures and lists open their editors
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // the edit bar, and a list's own controls (carousel arrows) keep working
      if (target.closest("[data-edit-ui]") || target.closest('[data-k-kind="list"] button')) return;
      const el = target.closest<HTMLElement>("[data-k]");
      if (!el) return;
      e.preventDefault();
      const k = el.dataset.k!;
      const kind = el.dataset.kKind;
      if (kind === "rich") setBox({ key: k, value: String(changesRef.current[k] ?? raw[k] ?? "") });
      else if (kind === "image") {
        imageKey.current = k;
        fileInput.current?.click();
      } else if (kind === "list" && k in LIST_FIELDS) setList(k);
    };
    // Enter shouldn't add line breaks to headings and labels
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.target as HTMLElement).closest('[data-k-kind="text"]')) {
        e.preventDefault();
        (e.target as HTMLElement).blur();
      }
    };
    document.addEventListener("input", onInput);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    return () => {
      delete document.body.dataset.editing;
      for (const el of texts) el.removeAttribute("contenteditable");
      document.removeEventListener("input", onInput);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [raw, change]);

  // mark changed long text and lists until they're saved (their new look appears after saving)
  useEffect(() => {
    for (const el of document.querySelectorAll<HTMLElement>("[data-k]")) {
      if (el.dataset.kKind === "rich" || el.dataset.kKind === "list") el.style.boxShadow = el.dataset.k! in changes ? "0 0 0 3px rgb(234 179 8 / 0.7)" : "";
    }
  }, [changes]);

  async function uploadImage(file: File) {
    const key = imageKey.current;
    if (!key) return;
    if (!file.type.startsWith("image/")) return setStatus("Please choose a picture file.");
    if (file.size > 8 * 1024 * 1024) return setStatus("That picture is over 8 MB. Please use a smaller one.");
    setStatus("uploading");
    const path = uploadPath(site, key, file.name);
    const supabase = browserClient();
    const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type, upsert: false });
    if (error) return setStatus("Couldn't upload that picture. Please try again.");
    const url = supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
    change(key, url);
    for (const img of document.querySelectorAll<HTMLImageElement>(`img[data-k="${key}"]`)) {
      img.srcset = "";
      img.src = URL.createObjectURL(file);
    }
    setStatus("");
  }

  async function save() {
    setStatus("saving");
    const r = await saveContent(site, changes);
    if ("error" in r && r.error) return setStatus(r.error);
    setChanges({});
    setRaw((prev) => ({ ...prev, ...changes }));
    setStatus("saved");
    router.refresh();
  }

  if (!raw) return null;
  const count = Object.keys(changes).length;

  return (
    <div data-edit-ui className="font-[Arial,sans-serif] text-[14px] text-neutral-900">
      <input ref={fileInput} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />

      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-wrap items-center gap-3 border-t border-neutral-300 bg-white/95 px-4 py-2.5 shadow-[0_-4px_20px_rgb(0_0_0/0.08)] backdrop-blur">
        <span className="font-semibold">Editing {SITE_INFO[site].name}</span>
        <span className="text-neutral-500">{status === "uploading" ? "Uploading picture…" : status === "saving" ? "Saving…" : status === "saved" && !count ? "Saved ✓ Your changes are live." : status && status !== "saved" ? status : count ? `${count} unsaved change${count === 1 ? "" : "s"}` : "Click anything outlined in blue to change it."}</span>
        <span className="ml-auto flex gap-2">
          {count > 0 && (
            <button onClick={() => window.location.reload()} className="rounded px-3 py-1.5 text-neutral-600 hover:bg-neutral-100">
              Discard
            </button>
          )}
          <a href="/edit" className="rounded px-3 py-1.5 text-neutral-600 hover:bg-neutral-100">
            Enquiries
          </a>
          <button onClick={save} disabled={!count || status === "saving"} className="rounded bg-blue-600 px-4 py-1.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-40">
            Save
          </button>
        </span>
      </div>

      {box && (
        <Modal title="Edit text" onClose={() => setBox(null)}>
          <p className="mb-2 text-neutral-500">Leave a blank line between paragraphs. Start a line with “- ” for a bullet point, “## ” for a small heading. Wrap words in **double stars** for bold.</p>
          <textarea autoFocus defaultValue={box.value} id="edit-box" rows={16} className="w-full rounded border border-neutral-300 p-2 font-[Arial,sans-serif] text-[15px] leading-relaxed" />
          <div className="mt-3 flex justify-end gap-2">
            <button onClick={() => setBox(null)} className="rounded px-3 py-1.5 hover:bg-neutral-100">
              Cancel
            </button>
            <button
              onClick={() => {
                change(box.key, (document.getElementById("edit-box") as HTMLTextAreaElement).value.trim());
                setBox(null);
              }}
              className="rounded bg-blue-600 px-4 py-1.5 font-semibold text-white"
            >
              Done
            </button>
          </div>
        </Modal>
      )}

      {list && (
        <Modal title="Edit list" onClose={() => setList(null)} wide>
          <ListEditor
            site={site}
            listKey={list}
            initial={(changes[list] ?? raw[list] ?? []) as Record<string, string>[]}
            onDone={(items) => {
              change(list, items);
              setList(null);
            }}
            onCancel={() => setList(null)}
          />
        </Modal>
      )}

      {/* lists can't be clicked like text: give each one a visible button */}
      <ListButtons onOpen={setList} />
    </div>
  );
}

function ListButtons({ onOpen }: { onOpen: (k: string) => void }) {
  const [lists, setLists] = useState<{ key: string; top: number; left: number }[]>([]);
  useEffect(() => {
    const place = () =>
      setLists(
        [...document.querySelectorAll<HTMLElement>('[data-k-kind="list"]')].map((el) => {
          const r = el.getBoundingClientRect();
          return { key: el.dataset.k!, top: r.top + window.scrollY - 14, left: r.right + window.scrollX - 110 };
        }),
      );
    place();
    window.addEventListener("resize", place);
    const t = setInterval(place, 1500);
    return () => {
      window.removeEventListener("resize", place);
      clearInterval(t);
    };
  }, []);
  return (
    <>
      {lists.map((l) => (
        <button key={l.key} onClick={() => onOpen(l.key)} style={{ top: l.top, left: l.left }} className="absolute z-40 rounded bg-blue-600 px-3 py-1 font-semibold text-white shadow">
          Edit list
        </button>
      ))}
    </>
  );
}

function Modal({ title, children, onClose, wide }: { title: string; children: React.ReactNode; onClose: () => void; wide?: boolean }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-[6vh]" onMouseDown={onClose}>
      <div className={`w-full ${wide ? "max-w-3xl" : "max-w-2xl"} rounded-lg bg-white p-5 shadow-2xl`} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label={title}>
        <h2 className="mb-3 text-base font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  );
}
