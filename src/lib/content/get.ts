import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { Site } from "@/lib/sites";
import { weddingDefaults, type WeddingContent } from "./wedding";
import { rccDefaults, type RccContent } from "./rcc";

export type ContentFor<S extends Site> = S extends "wedding" ? WeddingContent : RccContent;

const DEFAULTS = { wedding: weddingDefaults, rcc: rccDefaults };

/** Cache tag for a site's content: saving an edit calls updateTag(contentTag(site)) so the change shows at once. */
export const contentTag = (site: Site) => `content-${site}`;

/**
 * A site's content: the defaults (the Bubble site's text) with Minnie's saved edits laid over them, key by key. Cached
 * until an edit clears the tag. Until Supabase is configured the defaults are used on their own.
 */
export async function getContent<S extends Site>(site: S): Promise<ContentFor<S>> {
  "use cache";
  cacheTag(contentTag(site));
  cacheLife("max");
  const base = DEFAULTS[site] as ContentFor<S>;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return base;
  const { data, error } = await createClient(url, key, { auth: { persistSession: false } })
    .from("content")
    .select("key, value")
    .eq("site", site);
  if (error || !data) return base;
  const out: Record<string, unknown> = { ...base };
  // only keys the site knows about, so a stray row can't add fields
  for (const row of data) if (row.key in base) out[row.key] = row.value;
  return out as ContentFor<S>;
}
