import { headers } from "next/headers";
import { SITE_INFO, siteForHost } from "@/lib/sites";

/** Everything public may be indexed except the editing pages; staging hosts aren't indexed at all. */
export async function GET() {
  const site = siteForHost((await headers()).get("host"));
  const real = site && SITE_INFO[site].hosts.slice(0, 2).includes(((await headers()).get("host") ?? "").replace(/:\d+$/, ""));
  const body = real ? `User-agent: *\nDisallow: /edit\n\nSitemap: ${SITE_INFO[site].url}/sitemap.xml\n` : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=3600" } });
}
