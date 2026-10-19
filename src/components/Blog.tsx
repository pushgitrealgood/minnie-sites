import Image from "next/image";
import Link from "next/link";
import { E, ERich } from "@/components/Editable";
import { Rich } from "@/components/Rich";
import type { Post } from "@/lib/posts";
import { postDate } from "@/lib/post-date";
import { SITE_INFO, type Site } from "@/lib/sites";

/** Each site's look for the blog (fonts and colours come from its layout). */
const LOOK: Record<Site, { h: string; muted: string; link: string; btn: string; card: string; cta: string }> = {
  wedding: {
    h: "font-semibold text-wine",
    muted: "text-mauve",
    link: "text-wine",
    btn: "rounded bg-rose px-7 py-2.5 text-white hover:bg-wine",
    card: "bg-white",
    cta: "bg-sand",
  },
  rcc: {
    h: "font-display font-bold text-navy",
    muted: "text-slate",
    link: "text-royal",
    btn: "rounded bg-coral px-6 py-2.5 font-semibold text-white hover:bg-royal",
    card: "border border-slate-200 bg-white",
    cta: "bg-mist",
  },
};

type BlogText = { title: string; intro: string; cta: string; ctaButton: string };
const CTA_HREF: Record<Site, string> = { wedding: "/enquire", rcc: "/book" };

/** The blog's front page: every published post, newest first. */
export function PostList({ site, posts, t }: { site: Site; posts: Post[]; t: BlogText }) {
  const L = LOOK[site];
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <E k="blog.title" as="h1" className={`block text-center text-4xl sm:text-5xl ${L.h}`}>
          {t.title}
        </E>
        <ERich k="blog.intro" text={t.intro} className={`mx-auto mt-3 max-w-2xl text-center text-lg ${L.muted}`} />
        {posts.length ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className={`group overflow-hidden rounded-lg ${L.card}`}>
                {p.cover && <Image src={p.cover} alt={p.cover_alt} width={720} height={480} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" className="aspect-[3/2] w-full object-cover transition group-hover:scale-[1.02]" />}
                <div className="p-5">
                  <p className={`text-sm ${L.muted}`}>{postDate(p.published_at)}</p>
                  <h2 className={`mt-1 text-2xl leading-snug group-hover:underline ${L.h}`}>{p.title}</h2>
                  {p.excerpt && <p className={`mt-2 ${L.muted}`}>{p.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className={`mt-12 text-center ${L.muted}`}>New posts coming soon.</p>
        )}
      </div>
    </section>
  );
}

/** One post. `preview` is the editor's view of a draft in /edit (no links back to the site). */
export function PostArticle({ site, post, t, preview }: { site: Site; post: Post; t?: BlogText; preview?: boolean }) {
  const L = LOOK[site];
  return (
    <article className="px-4 py-12">
      <header className="mx-auto max-w-3xl text-center">
        {!preview && (
          <Link href="/blog" className={`text-sm hover:underline ${L.link}`}>
            ← {t?.title ?? "Blog"}
          </Link>
        )}
        <h1 className={`mt-3 text-4xl leading-tight sm:text-5xl ${L.h}`}>{post.title || "Untitled post"}</h1>
        <p className={`mt-3 ${L.muted}`}>{post.published_at ? postDate(post.published_at) : "Draft"}</p>
      </header>
      {post.cover && (
        <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-xl">
          <Image src={post.cover} alt={post.cover_alt} width={1600} height={900} sizes="(max-width: 1100px) 100vw, 1050px" className="aspect-[16/9] w-full object-cover" priority />
        </div>
      )}
      <Rich text={post.body} className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed" />
      {t && (
        <aside className={`mx-auto mt-14 max-w-2xl rounded-lg p-6 text-center ${L.cta}`}>
          <E k="blog.cta" as="p" className={`block text-xl ${L.h}`}>
            {t.cta}
          </E>
          {!preview && (
            <Link href={CTA_HREF[site]} className={`mt-4 inline-block ${L.btn}`}>
              <E k="blog.ctaButton">{t.ctaButton}</E>
            </Link>
          )}
        </aside>
      )}
    </article>
  );
}

/** Article details for Google (headline, date, picture, author). */
export function PostStructuredData({ site, post }: { site: Site; post: Post }) {
  const url = `${SITE_INFO[site].url}/blog/${post.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    ...(post.cover ? { image: post.cover } : {}),
    author: site === "wedding" ? { "@type": "Person", name: "Minnie" } : { "@type": "Organization", name: SITE_INFO.rcc.name },
    publisher: { "@type": "Organization", name: SITE_INFO[site].name, url: SITE_INFO[site].url },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
