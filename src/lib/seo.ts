import type { Metadata } from "next";
import { SITE_INFO, type Site } from "@/lib/sites";

/** Title, description, canonical URL and social tags for one page. */
export function pageMeta(site: Site, path: string, title: string, description: string): Metadata {
  const url = `${SITE_INFO[site].url}/${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_INFO[site].name, locale: "en_GB", type: "website" },
  };
}
