"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Site } from "@/lib/sites";

/**
 * Google Analytics 4, only after the visitor accepts cookies (UK rules). Each site has its own GA4 property, set in
 * the code below (measurement IDs are public) or overridden in Netlify as NEXT_PUBLIC_GA_ID_WEDDING / NEXT_PUBLIC_GA_ID_RCC.
 * Without an ID nothing shows.
 */
const GA_ID: Record<Site, string | undefined> = {
  wedding: process.env.NEXT_PUBLIC_GA_ID_WEDDING || "G-YV6LWWXLRT",
  rcc: process.env.NEXT_PUBLIC_GA_ID_RCC || "G-4ZMZSW4RMN",
};

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const KEY = "cookie-consent";
const listeners = new Set<() => void>();
function readConsent() {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}
function setConsent(value: "yes" | "no") {
  try {
    localStorage.setItem(KEY, value);
  } catch {}
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => (listeners.add(l), () => void listeners.delete(l));

function loadGa(id: string) {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag.js reads the arguments object itself
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

export function Analytics({ site }: { site: Site }) {
  const id = GA_ID[site];
  // "pending" on the server and before hydration, so the banner never flashes for people who already chose
  const consent = useSyncExternalStore(subscribe, readConsent, () => "pending");

  useEffect(() => {
    if (id && consent === "yes") loadGa(id);
  }, [id, consent]);

  if (!id || consent !== "") return null;
  const look =
    site === "wedding"
      ? { box: "bg-white text-ink font-serif text-lg", yes: "bg-rose text-white hover:bg-wine", no: "text-mauve" }
      : { box: "bg-white text-navy font-sans", yes: "bg-coral text-white hover:bg-royal", no: "text-slate" };
  return (
    <div role="region" aria-label="Cookies" className={`fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-xl flex-wrap items-center gap-3 rounded-lg p-4 shadow-[0_4px_24px_rgb(0_0_0/0.15)] ${look.box}`}>
      <p className="min-w-[14rem] flex-1">We use cookies to see how people find and use this site. Is that OK?</p>
      <button type="button" onClick={() => setConsent("no")} className={`rounded px-3 py-1.5 underline ${look.no}`}>
        No thanks
      </button>
      <button type="button" onClick={() => setConsent("yes")} className={`rounded px-4 py-1.5 font-semibold ${look.yes}`}>
        Accept
      </button>
    </div>
  );
}

/** Put inside a form's thank-you message: records the enquiry/booking as a lead in GA (only if accepted). */
export function TrackLead({ form }: { form: string }) {
  useEffect(() => {
    window.gtag?.("event", "generate_lead", { form });
  }, [form]);
  return null;
}
