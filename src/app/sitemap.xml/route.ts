import { headers } from "next/headers";
import { PAGES, SITE_INFO, siteForHost } from "@/lib/sites";
import { getPosts } from "@/lib/posts";
import { getContent } from "@/lib/content/get";

/** Each domain's own sitemap: its public pages and published blog posts. */
export async function GET() {
  const site = siteForHost((await headers()).get("host"));
  if (!site) return new Response("Not found", { status: 404 });
  const posts = await getPosts(site);
  const urls = PAGES[site].map((p) => `<url><loc>${SITE_INFO[site].url}/${p}</loc><changefreq>monthly</changefreq><priority>${p ? "0.7" : "1.0"}</priority></url>`);
  if (site === "rcc" && (await getContent("rcc")).caseStudies.length) urls.push(`<url><loc>${SITE_INFO.rcc.url}/case-studies</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  if (posts.length) urls.push(`<url><loc>${SITE_INFO[site].url}/blog</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`);
  for (const p of posts) urls.push(`<url><loc>${SITE_INFO[site].url}/blog/${p.slug}</loc><lastmod>${p.updated_at.slice(0, 10)}</lastmod><priority>0.6</priority></url>`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
  });
}
