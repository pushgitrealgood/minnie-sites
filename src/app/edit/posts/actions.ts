"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { currentEditor, serverClient } from "@/lib/supabase/server";
import { postsTag } from "@/lib/posts";
import { isSite } from "@/lib/sites";

/** "Our Ceremony at Hedsor House!" → "our-ceremony-at-hedsor-house" */
function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
}

/** Start a new draft and open it. */
export async function newPost(site: string) {
  const editor = await currentEditor();
  if (!editor || !isSite(site)) redirect("/edit");
  const supabase = await serverClient();
  const { data, error } = await supabase
    .from("posts")
    .insert({ site, slug: `draft-${Date.now().toString(36)}`, title: "", updated_by: editor })
    .select("id")
    .single();
  if (error || !data) redirect("/edit?error=post");
  redirect(`/edit/posts/${data.id}`);
}

export type PostFields = {
  title: string;
  slug: string;
  excerpt: string;
  cover: string;
  cover_alt: string;
  body: string;
  /** "2026-10-19" or "" for a draft */
  date: string;
};

/** Save a post (draft or published). Publishing needs a title; the address is made from it unless she set one. */
export async function savePost(id: string, f: PostFields) {
  const editor = await currentEditor();
  if (!editor) return { error: "Please sign in again." };
  const supabase = await serverClient();
  const { data: old } = await supabase.from("posts").select("site, slug").eq("id", id).single();
  if (!old) return { error: "That post no longer exists." };
  const slug = slugify(f.slug) || slugify(f.title) || old.slug;
  if (f.date && !f.title.trim()) return { error: "Give the post a title before publishing it." };
  if (f.date && !/^\d{4}-\d{2}-\d{2}$/.test(f.date)) return { error: "Please choose a date." };
  // midday UK time on the chosen day, so the date never shifts across midnight
  const published_at = f.date ? new Date(`${f.date}T12:00:00Z`).toISOString() : null;
  const { error } = await supabase
    .from("posts")
    .update({
      title: f.title.trim().slice(0, 200),
      slug,
      excerpt: f.excerpt.trim().slice(0, 400),
      cover: f.cover.trim(),
      cover_alt: f.cover_alt.trim().slice(0, 200),
      body: f.body.slice(0, 100000),
      published_at,
      updated_at: new Date().toISOString(),
      updated_by: editor,
    })
    .eq("id", id);
  if (error) return { error: error.code === "23505" ? "Another post already uses that web address. Please change it." : "Couldn't save. Please try again." };
  updateTag(postsTag(old.site));
  return { ok: true, slug };
}

export async function deletePost(id: string) {
  if (!(await currentEditor())) return { error: "Please sign in again." };
  const supabase = await serverClient();
  const { data } = await supabase.from("posts").delete().eq("id", id).select("site").single();
  if (data) updateTag(postsTag(data.site));
  redirect("/edit");
}
