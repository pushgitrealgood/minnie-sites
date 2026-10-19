import { NextResponse, type NextRequest } from "next/server";
import { isSite, siteForHost } from "@/lib/sites";

/**
 * One app, two domains: thoroughlymodernminnie.co.uk/faq is served from /wedding/faq, schoolresilienceworkshop.com/book
 * from /rcc/book. On other hosts (localhost, Netlify previews) the site is picked from the path instead (/wedding/…,
 * /rcc/…), so both can be previewed side by side. /edit and /api are shared and never rewritten.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const site = siteForHost(request.headers.get("host"));
  if (!site) return NextResponse.next();
  // on a real domain, /rcc/... or /wedding/... would show the other site: send it to its own domain path
  const first = pathname.split("/")[1] ?? "";
  if (isSite(first)) return NextResponse.redirect(new URL(pathname.slice(first.length + 1) || "/", request.url), 308);
  const url = request.nextUrl.clone();
  url.pathname = `/${site}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // everything except shared routes, Next internals and files with an extension (images, robots.txt, sitemap.xml…)
  matcher: ["/((?!edit|api|_next|.*\\..*).*)"],
};
