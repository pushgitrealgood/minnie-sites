import Image from "next/image";
import Link from "next/link";
import type { WeddingContent } from "@/lib/content/wedding";
import { E, EImg, ELink, ERich } from "@/components/Editable";
import { Rich } from "@/components/Rich";
import { Carousel } from "@/components/Carousel";
import { EnquiryForm } from "./EnquiryForm";

const CARDS = [
  { key: "types", anchor: "ceremonies" },
  { key: "prices", anchor: "prices" },
  { key: "how", anchor: "how-it-works" },
  { key: "about", anchor: "about-me" },
] as const;

export function WeddingHome({ c }: { c: WeddingContent }) {
  return (
    <>
      <section className="px-4 pt-14 pb-10 text-center">
        <E k="hero.title" as="h1" className="mb-5 block text-4xl font-semibold text-wine sm:text-5xl">
          {c["hero.title"]}
        </E>
        <ERich k="hero.text" text={c["hero.text"]} className="mx-auto max-w-2xl text-lg text-mauve" />
        <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-xl shadow-sm">
          <EImg k="hero.image" src={c["hero.image"]} alt="Wedding rings resting on a bouquet of cotton, lavender and eucalyptus" width={1600} height={900} sizes="(max-width: 1200px) 100vw, 1150px" className="aspect-[16/9] w-full object-cover" priority />
        </div>
      </section>

      <section id="about" className="scroll-mt-20 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <E k="intro.title" as="h2" className="block text-4xl font-medium sm:text-6xl">
            {c["intro.title"]}
          </E>
          <E k="intro.tagline" as="p" className="mt-3 block text-rose">
            {c["intro.tagline"]}
          </E>
          <div className="mt-6 grid gap-10 md:grid-cols-[1fr_300px]">
            <div className="text-lg">
              <E k="intro.heading" as="h3" className="mb-4 block text-3xl">
                {c["intro.heading"]}
              </E>
              <ERich k="intro.text" text={c["intro.text"]} />
              <p className="mt-5">
                <a href={`tel:${c["contact.phone"].replace(/\s/g, "")}`} className="hover:underline">
                  <E k="contact.phone">{c["contact.phone"]}</E>
                </a>
                <br />
                <a href={`mailto:${c["contact.email"]}`} className="break-all hover:underline">
                  <E k="contact.email">{c["contact.email"]}</E>
                </a>
              </p>
              <p className="mt-5 text-mauve">
                <E k="intro.accreditation">{c["intro.accreditation"]}</E>
                {" · "}
                <ELink k="intro.accreditationLink" urlKey="intro.accreditationUrl" href={c["intro.accreditationUrl"]} className="underline">
                  {c["intro.accreditationLink"]}
                </ELink>
              </p>
              <Link href="/enquire" className="mt-7 inline-block rounded bg-rose px-7 py-2.5 text-white hover:bg-wine">
                <E k="intro.cta">{c["intro.cta"]}</E>
              </Link>
            </div>
            <EImg k="intro.image" src={c["intro.image"]} alt="Minnie, wedding celebrant" width={600} height={760} sizes="300px" className="h-auto w-full rounded-xl object-cover" />
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <E k="services.title" as="h2" className="block text-4xl font-semibold">
              {c["services.title"]}
            </E>
            <E k="services.subtitle" as="p" className="mt-2 block text-lg text-mauve">
              {c["services.subtitle"]}
            </E>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map(({ key, anchor }) => (
              <article key={key} id={anchor} className="scroll-mt-24 rounded-lg bg-sand p-6">
                <E k={`services.${key}.title`} as="h3" className="mb-4 block text-2xl font-semibold text-wine">
                  {c[`services.${key}.title`]}
                </E>
                <ERich k={`services.${key}.text`} text={c[`services.${key}.text`]} className="text-[17px] leading-snug" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="scroll-mt-20 bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <E k="testimonials.title" as="h2" className="block text-4xl font-semibold">
              {c["testimonials.title"]}
            </E>
            <E k="testimonials.subtitle" as="p" className="mt-2 block text-lg text-mauve">
              {c["testimonials.subtitle"]}
            </E>
          </div>
          <div data-k="testimonials" data-k-kind="list">
            <Carousel
              label="Testimonials"
              slides={c.testimonials.map((t, i) => (
                <figure key={i} className="grid items-center gap-8 md:grid-cols-[280px_1fr]">
                  {t.image ? <Image src={t.image} alt={`${t.author}'s ceremony`} width={560} height={560} sizes="280px" className="aspect-square w-full rounded-lg object-contain" /> : <div />}
                  <blockquote>
                    <Rich text={t.quote} className="text-xl font-semibold leading-relaxed" />
                    <figcaption className="mt-4 text-mauve">{t.author}</figcaption>
                  </blockquote>
                </figure>
              ))}
            />
          </div>
        </div>
      </section>

      <section className="bg-wine px-4 py-14 text-center text-white">
        <E k="chat.title" as="h2" className="block text-3xl">
          {c["chat.title"]}
        </E>
        <E k="chat.text" as="p" className="mx-auto mt-2 block max-w-xl text-lg text-white/85">
          {c["chat.text"]}
        </E>
        <Link href="/enquire" className="mt-6 inline-block rounded bg-blush px-7 py-2.5 text-wine hover:bg-white">
          <E k="chat.cta">{c["chat.cta"]}</E>
        </Link>
      </section>
    </>
  );
}

export function WeddingFaq({ c }: { c: WeddingContent }) {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <E k="faq.title" as="h1" className="block text-center text-4xl font-semibold text-wine">
          {c["faq.title"]}
        </E>
        <ERich k="faq.intro" text={c["faq.intro"]} className="mt-3 text-center text-lg text-mauve" />
        <div className="mt-10 divide-y divide-wine/10 rounded-lg bg-white" data-k="faqs" data-k-kind="list">
          {c.faqs.map((f, i) => (
            <details key={i} className="group px-5 py-4" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-semibold">
                {f.q}
                <span className="text-rose transition group-open:rotate-45">+</span>
              </summary>
              <Rich text={f.a} className="mt-3 text-lg" />
            </details>
          ))}
        </div>
        <p className="mt-10 text-center">
          <Link href="/enquire" className="inline-block rounded bg-rose px-7 py-2.5 text-white hover:bg-wine">
            <E k="faq.cta">{c["faq.cta"]}</E>
          </Link>
        </p>
      </div>
      {/* FAQ rich results in Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}

export function WeddingEnquire({ c }: { c: WeddingContent }) {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-2xl">
        <E k="enquire.title" as="h1" className="block text-center text-4xl font-semibold text-wine">
          {c["enquire.title"]}
        </E>
        <ERich k="enquire.intro" text={c["enquire.intro"]} className="mt-3 text-center text-lg text-mauve" />
        <EnquiryForm thanks={c["enquire.thanks"]} />
        <p className="mt-8 text-center text-mauve">
          Or call{" "}
          <a href={`tel:${c["contact.phone"].replace(/\s/g, "")}`} className="underline">
            <E k="contact.phone">{c["contact.phone"]}</E>
          </a>{" "}
          · email{" "}
          <a href={`mailto:${c["contact.email"]}`} className="break-all underline">
            <E k="contact.email">{c["contact.email"]}</E>
          </a>
        </p>
      </div>
    </section>
  );
}
