import { NextResponse, type NextRequest } from "next/server";
import { isSite, SITE_INFO, siteForHost } from "@/lib/sites";

/**
 * One app, two domains: thoroughlymodernminnie.co.uk/faq is served from /wedding/faq, schoolresilienceworkshop.com/book
 * from /rcc/book. On other hosts (localhost, Netlify previews) the site is picked from the path instead (/wedding/…,
 * /rcc/…), so both can be previewed side by side. /edit and /api are shared and never rewritten.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const site = siteForHost(request.headers.get("host"));
  const first = pathname.split("/")[1] ?? "";
  if (!site) {
    // preview address: remember the site being looked at, so its menu links (/faq, /book…) stay on that site
    if (isSite(first)) {
      const res = NextResponse.next();
      res.cookies.set("preview-site", first, { path: "/" });
      return res;
    }
    const remembered = request.cookies.get("preview-site")?.value ?? "";
    if (!isSite(remembered)) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = `/${remembered}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }
  // one address per page for Google: www.… → the bare domain
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (host.startsWith("www.")) return NextResponse.redirect(new URL(pathname + request.nextUrl.search, SITE_INFO[site].url), 301);
  // on a real domain, /rcc/... or /wedding/... would show the other site: send it to its own domain path
  if (isSite(first)) return NextResponse.redirect(new URL(pathname.slice(first.length + 1) || "/", request.url), 308);
  const url = request.nextUrl.clone();
  url.pathname = `/${site}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // everything except shared routes, Next internals and files with an extension (images, robots.txt, sitemap.xml…)
  matcher: ["/((?!edit|api|_next|.*\\..*).*)"],
};
