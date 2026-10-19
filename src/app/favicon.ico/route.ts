import { headers } from "next/headers";
import { siteForHost } from "@/lib/sites";

/** Browsers and Google ask for /favicon.ico directly: send each domain to its own icon. */
export async function GET(request: Request) {
  const site = siteForHost((await headers()).get("host")) ?? "wedding";
  return Response.redirect(new URL(`/img/${site}/icon-48.png`, request.url), 301);
}
