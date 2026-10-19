/** The two sites this app serves, chosen by the request's domain (see proxy.ts). */

export const SITES = ["wedding", "rcc"] as const;
export type Site = (typeof SITES)[number];

export const SITE_INFO: Record<Site, { name: string; url: string; hosts: string[] }> = {
  wedding: {
    name: "Thoroughly Modern Minnie",
    url: "https://thoroughlymodernminnie.co.uk",
    hosts: ["thoroughlymodernminnie.co.uk", "www.thoroughlymodernminnie.co.uk", "wedding.localhost"],
  },
  rcc: {
    name: "RCC Workshops",
    url: "https://schoolresilienceworkshop.com",
    hosts: ["schoolresilienceworkshop.com", "www.schoolresilienceworkshop.com", "rcc.localhost"],
  },
};

/** Old Bubble addresses → their new page ("" = home), redirected permanently so old links and Google results still work. */
export const LEGACY: Record<Site, Record<string, string>> = {
  wedding: { submit_client_details: "enquire", client_portal: "", index: "", login: "", reset_pw: "" },
  rcc: { index: "", login: "", reset_pw: "" },
};

/** Public pages per site (path without leading slash; "" is the home page). */
export const PAGES: Record<Site, string[]> = {
  wedding: ["", "faq", "enquire"],
  rcc: ["", "workshops", "resilience", "confidence", "critical-thinking", "about-us", "book", "legal"],
};

export function isSite(s: string): s is Site {
  return (SITES as readonly string[]).includes(s);
}

/**
 * Which site a hostname belongs to: the real domains, wedding.localhost / rcc.localhost for local previews, and any
 * extra hosts in SITE_HOSTS (e.g. "wedding=wedding--minnie.netlify.app,rcc=…") for staging. Null for anything else.
 */
export function siteForHost(host: string | null): Site | null {
  const h = (host ?? "").toLowerCase().replace(/:\d+$/, "");
  for (const s of SITES) if (SITE_INFO[s].hosts.includes(h)) return s;
  for (const pair of (process.env.SITE_HOSTS ?? "").split(",")) {
    const [s, extra] = pair.split("=").map((x) => x.trim().toLowerCase());
    if (extra === h && isSite(s)) return s;
  }
  return null;
}
