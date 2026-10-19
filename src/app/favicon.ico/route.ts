import { headers } from "next/headers";
import { siteForHost } from "@/lib/sites";

/** Browsers and Google ask for /favicon.ico directly: send each domain to its own icon. */
export async function GET() {
  const site = siteForHost((await headers()).get("host")) ?? "wedding";
  // a relative address: request.url on Netlify is the internal deploy URL, not the domain the visitor used
  return new Response(null, { status: 301, headers: { Location: `/img/${site}/icon-48.png` } });
}
