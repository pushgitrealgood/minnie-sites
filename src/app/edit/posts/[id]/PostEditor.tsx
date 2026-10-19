"use client";

import { useRef, useState, useTransition } from "react";
import { browserClient } from "@/lib/supabase/browser";
import { uploadPath } from "@/lib/upload-path";
import { SITE_INFO } from "@/lib/sites";
import type { Post } from "@/lib/posts";
import { PostArticle } from "@/components/Blog";
import { deletePost, savePost, type PostFields } from "../actions";

const INPUT = "mt-1 w-full rounded border border-neutral-300 px-2 py-1.5";
const SITE_LOOK = { wedding: "bg-cream font-serif text-ink", rcc: "bg-white font-sans text-navy" };
const today = () => new Date().toISOString().slice(0, 10);

/** Write or change a blog post, with a live preview in the site's own look. */
export function PostEditor({ post }: { post: Post }) {
  const [f, setF] = useState<PostFields>({
    title: post.title,
    slug: post.slug.startsWith("draft-") ? "" : post.slug,
    excerpt: post.excerpt,
    cover: post.cover,
    cover_alt: post.cover_alt,
    body: post.body,
    date: post.published_at?.slice(0, 10) ?? "",
  });
  const [status, setStatus] = useState("");
  const [savedSlug, setSavedSlug] = useState(post.published_at ? post.slug : "");
  const [dirty, setDirty] = useState(false);
  const [pending, start] = useTransition();
  const [tab, setTab] = useState<"write" | "preview">("write");
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const set = (k: keyof PostFields, v: string) => {
    setF((x) => ({ ...x, [k]: v }));
    setDirty(true);
  };
  const published = !!f.date;
  const site = post.site;

  function save(next: PostFields = f) {
    setStatus("");
    start(async () => {
      const r = await savePost(post.id, next);
      if ("error" in r && r.error) return setStatus(r.error);
      setF(next);
      setDirty(false);
      setSavedSlug(next.date ? (r.slug ?? "") : "");
      setStatus(next.date ? "Saved. It's live." : "Saved as a draft (only you can see it).");
    });
  }

  async function upload(file: File) {
    if (!file.type.startsWith("image/")) throw new Error("Please choose a picture file.");
    if (file.size > 8 * 1024 * 1024) throw new Error("That picture is over 8 MB. Please use a smaller one.");
    const supabase = browserClient();
    const path = uploadPath(site, "blog", file.name);
    const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type });
    if (error) throw new Error("Couldn't upload that picture. Please try again.");
    return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
  }

  async function onCover(file: File) {
    setStatus("Uploading picture…");
    try {
      set("cover", await upload(file));
      setStatus("");
    } catch (e) {
      setStatus((e as Error).message);
    }
  }

  /** Upload a picture and put it in the text where the cursor is. */
  async function onInlinePicture(file: File) {
    setStatus("Uploading picture…");
    try {
      const url = await upload(file);
      const el = bodyRef.current;
      const at = el?.selectionStart ?? f.body.length;
      const line = `\n\n![${file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")}](${url})\n\n`;
      set("body", (f.body.slice(0, at) + line + f.body.slice(at)).replace(/\n{3,}/g, "\n\n"));
      setStatus("Picture added. Change the words in [ ] to give it a caption (or leave them empty).");
    } catch (e) {
      setStatus((e as Error).message);
    }
  }

  const preview: Post = { ...post, ...f, slug: f.slug || post.slug, published_at: f.date ? `${f.date}T12:00:00Z` : null };
  const liveUrl = savedSlug ? `${SITE_INFO[site].url}/blog/${savedSlug}` : "";

  return (
    <div>
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-neutral-200 bg-white px-4 py-2.5">
        <a href="/edit" className="text-neutral-500 hover:underline">
          ← Your websites
        </a>
        <span className="font-semibold">
          {SITE_INFO[site].name} · {published ? "Published" : "Draft"}
        </span>
        <span className="text-sm text-neutral-500">{pending ? "Saving…" : status || (dirty ? "Unsaved changes" : "")}</span>
        <span className="ml-auto flex flex-wrap gap-2">
          {liveUrl && !dirty && (
            <a href={liveUrl} target="_blank" rel="noopener" className="rounded px-3 py-1.5 text-blue-700 hover:bg-blue-50">
              View on site ↗
            </a>
          )}
          {published ? (
            <button onClick={() => save({ ...f, date: "" })} disabled={pending} className="rounded px-3 py-1.5 text-neutral-600 hover:bg-neutral-100">
              Unpublish
            </button>
          ) : (
            <button onClick={() => save({ ...f, date: today() })} disabled={pending} className="rounded border border-blue-600 px-3 py-1.5 font-semibold text-blue-700 hover:bg-blue-50">
              Publish
            </button>
          )}
          <button onClick={() => save()} disabled={pending || !dirty} className="rounded bg-blue-600 px-4 py-1.5 font-semibold text-white disabled:opacity-40">
            Save
          </button>
        </span>
      </div>

      <div className="flex gap-2 px-4 pt-3 lg:hidden">
        {(["write", "preview"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3 py-1 text-sm ${tab === t ? "bg-neutral-900 text-white" : "bg-white ring-1 ring-neutral-200"}`}>
            {t === "write" ? "Write" : "Preview"}
          </button>
        ))}
      </div>

      <div className="grid gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className={`space-y-4 ${tab === "preview" ? "hidden lg:block" : ""}`}>
          <label className="block">
            <span className="font-semibold">Title</span>
            <input value={f.title} onChange={(e) => set("title", e.target.value)} className={`${INPUT} text-lg`} placeholder="e.g. Our ceremony at Hedsor House" />
          </label>
          <label className="block">
            <span className="font-semibold">Short summary</span> <span className="text-sm text-neutral-500">shown on the blog page and in Google</span>
            <textarea value={f.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} maxLength={400} className={INPUT} />
          </label>
          <div>
            <span className="font-semibold">Cover picture</span>
            <div className="mt-1 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {f.cover && <img src={f.cover} alt="" className="h-16 w-24 rounded object-cover" />}
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onCover(e.target.files[0])} />
              {f.cover && (
                <button onClick={() => set("cover", "")} className="text-sm text-red-700 hover:underline">
                  Remove
                </button>
              )}
            </div>
            <input value={f.cover_alt} onChange={(e) => set("cover_alt", e.target.value)} className={INPUT} placeholder="Describe the picture (for people who can't see it, and Google)" />
          </div>
          <label className="block">
            <span className="font-semibold">Post</span>
            <textarea ref={bodyRef} value={f.body} onChange={(e) => set("body", e.target.value)} rows={22} className={`${INPUT} font-[Arial,sans-serif] text-[15px] leading-relaxed`} />
          </label>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <label className="cursor-pointer rounded border border-neutral-300 bg-white px-3 py-1.5 hover:bg-neutral-50">
              + Add a picture here
              <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && onInlinePicture(e.target.files[0])} />
            </label>
            <span className="text-neutral-500">Click in the text where it should go first.</span>
          </div>
          <details className="rounded border border-neutral-200 bg-white p-3 text-sm text-neutral-700">
            <summary className="cursor-pointer font-semibold">How to format the post</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Leave a blank line between paragraphs.</li>
              <li>Start a line with “## ” for a heading, “- ” for a bullet point, “1. ” for a numbered list, “&gt; ” for a quote.</li>
              <li>Wrap words in **double stars** for bold.</li>
              <li>A link: [the words](https://the-address.com). Pages on this site can be just [Enquire](/enquire).</li>
              <li>A picture on its own line: ![caption](picture address). The button above does this for you.</li>
            </ul>
          </details>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="font-semibold">Web address</span>
              <span className="mt-1 flex items-center text-sm text-neutral-500">
                /blog/
                <input value={f.slug} onChange={(e) => set("slug", e.target.value)} placeholder="made from the title" className="ml-1 w-full rounded border border-neutral-300 px-2 py-1.5 text-neutral-900" />
              </span>
            </label>
            <label className="block">
              <span className="font-semibold">Date</span>
              <input type="date" value={f.date} onChange={(e) => set("date", e.target.value)} className={INPUT} />
              <span className="text-sm text-neutral-500">{published ? "Clear the date to make it a draft again." : "Empty while it's a draft."}</span>
            </label>
          </div>
          <button
            onClick={() => confirm("Delete this post for good?") && start(() => deletePost(post.id).then(() => undefined))}
            className="text-sm text-red-700 hover:underline"
          >
            Delete post
          </button>
        </div>

        <div className={`overflow-hidden rounded-lg border border-neutral-200 ${SITE_LOOK[site]} ${tab === "write" ? "hidden lg:block" : ""}`}>
          <PostArticle site={site} post={preview} preview />
        </div>
      </div>
    </div>
  );
}
