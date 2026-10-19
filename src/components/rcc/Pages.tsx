import Image from "next/image";
import Link from "next/link";
import type { RccContent } from "@/lib/content/rcc";
import { E, EImg, ELink, ERich } from "@/components/Editable";
import { FreeResourceForm } from "./FreeResource";
import { Rich } from "@/components/Rich";
import { BookingForm } from "./BookingForm";

const H2 = "block font-display text-3xl font-bold leading-tight sm:text-4xl";
const EYEBROW = "block text-sm font-semibold tracking-widest text-coral uppercase";
const BTN = "inline-block rounded bg-coral px-6 py-2.5 font-semibold text-white hover:bg-royal";
const BTN2 = "inline-block rounded border border-slate-300 bg-white px-6 py-2.5 font-semibold text-navy hover:border-navy";

const PILLARS = [
  { key: "resilience", href: "/resilience" },
  { key: "confidence", href: "/confidence" },
  { key: "critical", href: "/critical-thinking" },
] as const;

function WhyItMatters({ c }: { c: RccContent }) {
  return (
    <section className="bg-mist px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <E k="why.title" as="h2" className={H2}>
          {c["why.title"]}
        </E>
        <ERich k="why.text" text={c["why.text"]} className="mt-5 text-lg text-slate" />
        <Link href="/workshops" className="mt-6 inline-block font-semibold text-royal hover:underline">
          <E k="why.link">{c["why.link"]}</E>
        </Link>
      </div>
    </section>
  );
}

function Cta({ c }: { c: RccContent }) {
  return (
    <section className="bg-royal px-4 py-14 text-center text-white">
      <E k="cta.title" as="h2" className="block font-display text-3xl font-bold sm:text-4xl">
        {c["cta.title"]}
      </E>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/book" className={BTN}>
          <E k="cta.button">{c["cta.button"]}</E>
        </Link>
        <Link href="/workshops" className="inline-block rounded border border-white/60 px-6 py-2.5 font-semibold hover:bg-white hover:text-navy">
          <E k="cta.button2">{c["cta.button2"]}</E>
        </Link>
      </div>
    </section>
  );
}

/** Free PDF for teachers in exchange for their email. Hidden from visitors until a PDF has been added (edit mode shows it). */
function FreeResource({ c }: { c: RccContent }) {
  return (
    <section id="free-resource" className={`scroll-mt-20 bg-navy px-4 py-16 text-white ${c["resource.file"] ? "" : "edit-only"}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <E k="resource.eyebrow" as="p" className={EYEBROW}>
            {c["resource.eyebrow"]}
          </E>
          <E k="resource.title" as="h2" className="mt-2 block font-display text-3xl font-bold sm:text-4xl">
            {c["resource.title"]}
          </E>
          <ERich k="resource.text" text={c["resource.text"]} className="mt-4 text-lg text-white/85" />
          <p className="edit-only mt-6 rounded bg-white/10 p-3 text-sm">
            {c["resource.file"] ? "The PDF people get: " : "Add the PDF (click to upload it) and this section appears on the site: "}
            <ELink k="resource.fileLabel" urlKey="resource.file" href={c["resource.file"] || "#"} className="underline">
              {c["resource.fileLabel"]}
            </ELink>
            <br />
            <E k="resource.thanks">{c["resource.thanks"]}</E>
          </p>
        </div>
        <FreeResourceForm button={c["resource.button"]} thanks={c["resource.thanks"]} fileLabel={c["resource.fileLabel"]} />
      </div>
    </section>
  );
}

function Testimonials({ c }: { c: RccContent }) {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <E k="testimonials.eyebrow" as="p" className={EYEBROW}>
          {c["testimonials.eyebrow"]}
        </E>
        <E k="testimonials.title" as="h2" className={`${H2} mt-2`}>
          {c["testimonials.title"]}
        </E>
        <div className="mt-8 grid gap-6 md:grid-cols-3" data-k="testimonials" data-k-kind="list">
          {c.testimonials.map((t, i) => (
            <figure key={i} className="flex flex-col rounded-lg border border-slate-200 p-6">
              <blockquote className="flex-1 text-slate">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {t.image && <Image src={t.image} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />}
                <span>
                  <span className="block font-semibold">{t.role}</span>
                  <span className="text-sm text-slate">{t.place}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RccHome({ c }: { c: RccContent }) {
  return (
    <>
      <section className="px-4 pt-14 pb-10 text-center">
        <E k="home.title" as="h1" className="block font-display text-4xl font-extrabold text-royal sm:text-6xl">
          {c["home.title"]}
        </E>
        <ERich k="home.text" text={c["home.text"]} className="mx-auto mt-4 max-w-2xl text-lg text-slate" />
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/book" className={BTN}>
            <E k="home.button1">{c["home.button1"]}</E>
          </Link>
          <Link href="/workshops" className={BTN2}>
            <E k="home.button2">{c["home.button2"]}</E>
          </Link>
        </div>
        <EImg k="home.image" src={c["home.image"]} alt="Illustration of ideas, creativity and design around a light bulb" width={1200} height={741} sizes="(max-width: 800px) 100vw, 720px" className="mx-auto mt-10 w-full max-w-3xl rounded-lg" priority />
      </section>

      <section className="border-y border-slate-200 bg-mist px-4 py-8 text-center">
        <E k="home.trusted" as="p" className={EYEBROW}>
          {c["home.trusted"]}
        </E>
        <EImg k="home.trustedLogo" src={c["home.trustedLogo"]} alt="Schools we've worked with" width={300} height={175} sizes="200px" className="mx-auto mt-4 h-20 w-auto" />
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <E k="pillars.eyebrow" as="p" className={EYEBROW}>
            {c["pillars.eyebrow"]}
          </E>
          <E k="pillars.title" as="h2" className={`${H2} mt-2`}>
            {c["pillars.title"]}
          </E>
          <E k="pillars.text" as="p" className="mt-3 block text-lg text-slate">
            {c["pillars.text"]}
          </E>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            {PILLARS.map((p) => (
              <article key={p.key} className="overflow-hidden rounded-lg border border-slate-200">
                <EImg k={`pillars.${p.key}.image`} src={c[`pillars.${p.key}.image`]} alt={`${c[`pillars.${p.key}.title`]} illustration`} width={600} height={560} sizes="(max-width: 768px) 100vw, 370px" className="aspect-[4/3] w-full bg-white object-contain" />
                <div className="p-5">
                  <E k={`pillars.${p.key}.title`} as="h3" className="block font-display text-xl font-bold">
                    {c[`pillars.${p.key}.title`]}
                  </E>
                  <E k={`pillars.${p.key}.text`} as="p" className="mt-1 block text-slate">
                    {c[`pillars.${p.key}.text`]}
                  </E>
                  <Link href={p.href} className="mt-3 inline-block font-semibold text-royal hover:underline">
                    <E k="pillars.more">{c["pillars.more"]}</E>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-royal px-4 py-16 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <E k="included.eyebrow" as="p" className="block text-sm font-semibold tracking-widest text-coral uppercase">
              {c["included.eyebrow"]}
            </E>
            <E k="included.title" as="h2" className="mt-2 block font-display text-3xl font-bold sm:text-4xl">
              {c["included.title"]}
            </E>
            <ERich k="included.text" text={c["included.text"]} className="mt-4 text-white/85" />
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              {[1, 2, 3, 4].map((n) => (
                <div key={n}>
                  <E k={`included.${n}.title`} as="dt" className="block font-semibold">
                    {c[`included.${n}.title` as "included.1.title"]}
                  </E>
                  <E k={`included.${n}.text`} as="dd" className="mt-1 block text-white/80">
                    {c[`included.${n}.text` as "included.1.text"]}
                  </E>
                </div>
              ))}
            </dl>
          </div>
          <EImg k="included.image" src={c["included.image"]} alt="A child reading, surrounded by drawings of ideas" width={800} height={800} sizes="(max-width: 768px) 100vw, 560px" className="w-full rounded-lg" />
        </div>
      </section>

      <section className="px-4 py-14">
        <EImg k="home.skillsImage" src={c["home.skillsImage"]} alt="Critical thinking skills: problem solving, open-mindedness, analysis, communication and creativity" width={1500} height={1000} sizes="(max-width: 1200px) 100vw, 1150px" className="mx-auto w-full max-w-6xl rounded-lg" />
      </section>

      <WhyItMatters c={c} />

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <E k="booking.title" as="h2" className={H2}>
              {c["booking.title"]}
            </E>
            <ERich k="booking.text" text={c["booking.text"]} className="mt-5 text-lg text-slate" />
            <Link href="/book" className={`${BTN} mt-6`}>
              <E k="booking.button">{c["booking.button"]}</E>
            </Link>
          </div>
          <EImg k="booking.image" src={c["booking.image"]} alt="Advantages of developing critical thinking skills" width={490} height={575} sizes="(max-width: 768px) 100vw, 480px" className="mx-auto w-full max-w-md rounded-lg" />
        </div>
      </section>

      <FreeResource c={c} />
      <Testimonials c={c} />
      <Cta c={c} />
    </>
  );
}

function PageHead({ c, k, lead }: { c: RccContent; k: keyof RccContent; lead?: keyof RccContent }) {
  return (
    <section className="bg-mist px-4 py-14 text-center">
      <E k={k} as="h1" className="mx-auto block max-w-4xl font-display text-4xl font-extrabold text-royal sm:text-5xl">
        {String(c[k])}
      </E>
      {lead && <ERich k={lead} text={String(c[lead])} className="mx-auto mt-4 max-w-2xl text-lg text-slate" />}
    </section>
  );
}

export function RccWorkshops({ c }: { c: RccContent }) {
  return (
    <>
      <PageHead c={c} k="workshops.title" lead="workshops.lead" />
      <article className="mx-auto max-w-3xl px-4 py-14 text-lg text-slate">
        <E k="workshops.includedTitle" as="h2" className="block font-display text-3xl font-bold text-navy">
          {c["workshops.includedTitle"]}
        </E>
        <ERich k="workshops.included" text={c["workshops.included"]} className="mt-4" />
        <EImg k="workshops.image" src={c["workshops.image"]} alt="RCC Workshops" width={520} height={186} sizes="(max-width: 768px) 100vw, 720px" className="my-10 w-full rounded" />
        <ERich k="workshops.overview" text={c["workshops.overview"]} />
        <ERich k="workshops.drama" text={c["workshops.drama"]} className="mt-8" />
        <E k="workshops.activitiesTitle" as="h2" className="mt-12 block font-display text-3xl font-bold text-navy">
          {c["workshops.activitiesTitle"]}
        </E>
        <div className="mt-6 grid gap-4 sm:grid-cols-2" data-k="activities" data-k-kind="list">
          {c.activities.map((a, i) => (
            <div key={i} className="rounded-lg border border-slate-200 p-5 text-base">
              <h3 className="text-lg font-semibold text-navy">{a.title}</h3>
              <p className="mt-2">{a.how}</p>
              <p className="mt-2">
                <strong className="text-navy">{c["workshops.why"]}</strong> {a.why}
              </p>
            </div>
          ))}
        </div>
        <E k="workshops.moreTitle" as="h3" className="mt-10 block text-xl font-semibold text-navy">
          {c["workshops.moreTitle"]}
        </E>
        <ERich k="workshops.more" text={c["workshops.more"]} className="mt-3 text-base" />
      </article>
      <FreeResource c={c} />
      <Cta c={c} />
    </>
  );
}

/** Resilience, Confidence and Critical Thinking pages: an article with pictures, then "Why it matters". */
export function RccTopic({ c, topic }: { c: RccContent; topic: "resilience" | "confidence" | "critical" }) {
  const k = <T extends string>(f: T) => `${topic}.${f}` as keyof RccContent;
  const img2 = c[k("image2")] as string;
  const img3 = topic === "resilience" ? c["resilience.image3"] : null;
  return (
    <>
      <PageHead c={c} k={k("title")} />
      <article className="mx-auto max-w-3xl px-4 py-14 text-lg text-slate">
        <EImg k={k("image")} src={c[k("image")] as string} alt="" width={1200} height={800} sizes="(max-width: 768px) 100vw, 720px" className="mb-10 w-full rounded-lg" priority />
        <ERich k={k("text")} text={c[k("text")] as string} />
        {img2 && <EImg k={k("image2")} src={img2} alt="" width={1600} height={900} sizes="(max-width: 768px) 100vw, 720px" className="mt-10 w-full rounded-lg" />}
        {img3 && <EImg k="resilience.image3" src={img3} alt="" width={1000} height={900} sizes="(max-width: 768px) 100vw, 720px" className="mt-6 w-full rounded-lg" />}
      </article>
      <WhyItMatters c={c} />
      <Cta c={c} />
    </>
  );
}

export function RccAbout({ c }: { c: RccContent }) {
  return (
    <>
      <PageHead c={c} k="about.title" />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-[300px_1fr]">
        <EImg k="about.image" src={c["about.image"]} alt="Minnie Lupton, workshop facilitator" width={330} height={483} sizes="300px" className="w-full rounded-lg" />
        <ERich k="about.text" text={c["about.text"]} className="text-lg text-slate" />
      </section>
      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <Link key={p.key} href={p.href} className="rounded-lg border border-slate-200 p-5 hover:border-navy">
              <h2 className="font-display text-xl font-bold">{c[`pillars.${p.key}.title`]}</h2>
              <p className="mt-1 text-slate">{c[`pillars.${p.key}.text`]}</p>
            </Link>
          ))}
        </div>
      </section>
      <Cta c={c} />
    </>
  );
}

export function RccBook({ c }: { c: RccContent }) {
  return (
    <>
      <PageHead c={c} k="book.title" lead="book.text" />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <BookingForm thanks={c["book.thanks"]} />
        <p className="mt-6 text-center text-slate">
          <E k="book.questions">{c["book.questions"]}</E>{" "}
          <a href={`mailto:${c["contact.email"]}`} className="text-royal underline">
            <E k="contact.email">{c["contact.email"]}</E>
          </a>
        </p>
      </section>
      <Testimonials c={c} />
    </>
  );
}

export function RccLegal({ c }: { c: RccContent }) {
  return (
    <>
      <PageHead c={c} k="legal.title" />
      <article className="mx-auto max-w-3xl px-4 py-14 text-slate">
        <ERich k="legal.text" text={c["legal.text"]} />
        <Rich text={`Contact: ${c["contact.email"]}`} className="mt-8" />
      </article>
    </>
  );
}

export function RccCaseStudies({ c }: { c: RccContent }) {
  return (
    <>
      <PageHead c={c} k="caseStudies.title" lead="caseStudies.intro" />
      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="space-y-10" data-k="caseStudies" data-k-kind="list">
          {c.caseStudies.map((s, i) => (
            <article key={i} className="grid gap-8 rounded-lg border border-slate-200 p-6 md:grid-cols-[280px_1fr]">
              {s.image ? <Image src={s.image} alt={`Workshop at ${s.school}`} width={560} height={420} sizes="(max-width: 768px) 100vw, 280px" className="aspect-[4/3] w-full rounded object-cover" /> : null}
              <div className={s.image ? "" : "md:col-span-2"}>
                <p className={EYEBROW}>{s.school}</p>
                <h2 className="mt-1 font-display text-2xl font-bold">{s.title}</h2>
                {s.summary && <Rich text={s.summary} className="mt-3 text-slate" />}
                {s.outcome && (
                  <>
                    <h3 className="mt-5 font-semibold text-navy">What changed</h3>
                    <Rich text={s.outcome} className="mt-1 text-slate" />
                  </>
                )}
                {s.quote && <blockquote className="mt-5 border-l-4 border-coral pl-4 text-lg italic">“{s.quote}”</blockquote>}
              </div>
            </article>
          ))}
          {!c.caseStudies.length && <p className="text-center text-slate">Case studies coming soon.</p>}
        </div>
      </section>
      <Cta c={c} />
    </>
  );
}
