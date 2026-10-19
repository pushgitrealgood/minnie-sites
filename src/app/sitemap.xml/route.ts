import { headers } from "next/headers";
import { PAGES, SITE_INFO, siteForHost } from "@/lib/sites";

/** Each domain's own sitemap: its public pages only. */
export async function GET() {
  const site = siteForHost((await headers()).get("host"));
  if (!site) return new Response("Not found", { status: 404 });
  const urls = PAGES[site].map((p) => `<url><loc>${SITE_INFO[site].url}/${p}</loc><changefreq>monthly</changefreq><priority>${p ? "0.7" : "1.0"}</priority></url>`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
  });
}
