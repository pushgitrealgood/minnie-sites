import Image from "next/image";
import Link from "next/link";
import type { RccContent } from "@/lib/content/rcc";
import { E } from "@/components/Editable";

const NAV = [
  { href: "/workshops", label: "Workshops" },
  { href: "/resilience", label: "Resilience" },
  { href: "/confidence", label: "Confidence" },
  { href: "/critical-thinking", label: "Critical thinking" },
  { href: "/about-us", label: "About" },
];

export function RccHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-4 py-2">
        <Link href="/" aria-label="RCC Workshops home" className="shrink-0">
          <Image src="/img/rcc/RCC-logo.png" alt="RCC Workshops: Resilience, Confidence, Critical thinking" width={60} height={53} className="h-12 w-auto" priority />
        </Link>
        <nav className="hidden flex-1 gap-6 text-[15px] text-slate lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-navy">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/book" className="ml-auto hidden rounded bg-coral px-5 py-2 font-semibold text-white hover:bg-royal lg:inline-block">
          Book a workshop
        </Link>
        <details className="relative ml-auto lg:hidden">
          <summary className="cursor-pointer list-none rounded border border-slate-300 px-4 py-1.5">Menu</summary>
          <nav className="absolute right-0 mt-2 flex w-56 flex-col rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
            {[...NAV, { href: "/book", label: "Book a workshop" }].map((n) => (
              <Link key={n.href} href={n.href} className="rounded px-3 py-2 hover:bg-mist">
                {n.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

export function RccFooter({ c }: { c: RccContent }) {
  return (
    <footer className="border-t border-slate-200 bg-mist">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-8 text-sm text-slate">
        <span>© RCC Workshops</span>
        <Link href="/legal" className="hover:text-navy">
          Privacy &amp; terms
        </Link>
        <Link href="/book" className="hover:text-navy">
          Book a workshop
        </Link>
        <a href={`mailto:${c["contact.email"]}`} className="ml-auto hover:text-navy">
          <E k="contact.email">{c["contact.email"]}</E>
        </a>
      </div>
    </footer>
  );
}
