import Image from "next/image";
import Link from "next/link";
import type { WeddingContent } from "@/lib/content/wedding";
import { E } from "@/components/Editable";

const NAV = [
  { href: "/", label: "Welcome" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQs" },
];

export function WeddingHeader({ blogLabel }: { blogLabel?: string }) {
  // the Journal joins the menu once a post is published
  const nav = blogLabel ? [...NAV, { href: "/blog", label: blogLabel }] : NAV;
  return (
    <header className="sticky top-0 z-30 border-b border-wine/10 bg-sand/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5">
        <Link href="/" aria-label="Thoroughly Modern Minnie home" className="shrink-0">
          <Image src="/img/wedding/logo.png" alt="Thoroughly Modern Minnie, wedding celebrant" width={64} height={64} className="h-14 w-14 object-contain" priority />
        </Link>
        <nav className="hidden flex-1 justify-center gap-7 font-script text-lg text-wine md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:underline">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/enquire" className="ml-auto hidden rounded-full bg-blush px-5 py-1.5 text-wine hover:bg-rose hover:text-white md:inline-block">
          Enquire
        </Link>
        {/* phones: a menu that needs no JavaScript */}
        <details className="relative ml-auto md:hidden">
          <summary className="cursor-pointer list-none rounded-full bg-blush px-4 py-1.5 font-script text-lg text-wine">Menu</summary>
          <nav className="absolute right-0 mt-2 flex w-48 flex-col rounded-lg border border-wine/10 bg-white p-2 font-script text-lg text-wine shadow-lg">
            {[...nav, { href: "/enquire", label: "Enquire" }].map((n) => (
              <Link key={n.href} href={n.href} className="rounded px-3 py-1.5 hover:bg-sand">
                {n.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

export function WeddingFooter({ c }: { c: WeddingContent }) {
  return (
    <footer className="border-t border-wine/10 bg-sand">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-4">
        <Image src="/img/wedding/flower-heart.png" alt="" width={90} height={90} className="h-20 w-20 object-contain opacity-80" />
        <div>
          <h2 className="mb-2 font-script text-xl font-bold text-wine">Explore</h2>
          <ul className="space-y-1">
            {NAV.slice(0, 4).map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-script text-xl font-bold text-wine">Resources</h2>
          <ul className="space-y-1">
            <li>
              <Link href="/enquire" className="hover:underline">
                Enquire
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-script text-xl font-bold text-wine">Contact</h2>
          <p>
            <a href={`tel:${c["contact.phone"].replace(/\s/g, "")}`} className="hover:underline">
              <E k="contact.phone">{c["contact.phone"]}</E>
            </a>
          </p>
          <p className="break-all">
            <a href={`mailto:${c["contact.email"]}`} className="hover:underline">
              <E k="contact.email">{c["contact.email"]}</E>
            </a>
          </p>
        </div>
      </div>
      <p className="pb-6 text-center text-sm text-mauve">
        <E k="footer.copyright">{c["footer.copyright"]}</E>
      </p>
    </footer>
  );
}
