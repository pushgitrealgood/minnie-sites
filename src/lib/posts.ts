import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { Site } from "@/lib/sites";

/** A blog post. Drafts have no published_at and are only seen by editors (in /edit). */
export type Post = {
  id: string;
  site: Site;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  cover_alt: string;
  body: string;
  published_at: string | null;
  updated_at: string;
};

/** Cache tag for a site's posts: saving a post calls updateTag(postsTag(site)) so it shows at once. */
export const postsTag = (site: Site) => `posts-${site}`;

const FIELDS = "id, site, slug, title, excerpt, cover, cover_alt, body, published_at, updated_at";

function anon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

/** Published posts, newest first (the database only returns published ones to visitors). */
export async function getPosts(site: Site): Promise<Post[]> {
  "use cache";
  cacheTag(postsTag(site));
  // hourly as well, so a post dated in the future appears once its date arrives
  cacheLife("hours");
  const db = anon();
  if (!db) return [];
  const { data } = await db.from("posts").select(FIELDS).eq("site", site).order("published_at", { ascending: false });
  return (data ?? []) as Post[];
}

export async function getPost(site: Site, slug: string): Promise<Post | null> {
  return (await getPosts(site)).find((p) => p.slug === slug) ?? null;
}
