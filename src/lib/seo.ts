import type { Metadata } from "next";
import { SITE_INFO, type Site } from "@/lib/sites";

/** Title, description, canonical URL and social tags for one page. */
export function pageMeta(site: Site, path: string, title: string, description: string): Metadata {
  const url = `${SITE_INFO[site].url}/${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_INFO[site].name, locale: "en_GB", type: "website", images: [shareImage(site)] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage(site).url] },
  };
}

/** The picture shown when a page is shared (WhatsApp, Facebook, LinkedIn…): 1200×630, in public/img/<site>/share.jpg. */
function shareImage(site: Site) {
  return { url: `${SITE_INFO[site].url}/img/${site}/share.jpg`, width: 1200, height: 630, alt: SITE_INFO[site].name };
}
