import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getContent } from "@/lib/content/get";
import { getPost, getPosts } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";
import { SITE_INFO, type Site } from "@/lib/sites";
import { PostArticle, PostList, PostStructuredData } from "@/components/Blog";

/** The blog's routes, shared by both sites (src/app/<site>/blog/…). */

async function blogText(site: Site) {
  const c = await getContent(site);
  return { title: c["blog.title"], intro: c["blog.intro"], cta: c["blog.cta"], ctaButton: c["blog.ctaButton"] };
}

export async function blogMeta(site: Site): Promise<Metadata> {
  const t = await blogText(site);
  return pageMeta(site, "blog", `${t.title} | ${SITE_INFO[site].name}`, t.intro.replace(/\s+/g, " ").slice(0, 160));
}

export async function BlogIndex({ site }: { site: Site }) {
  const [posts, t] = await Promise.all([getPosts(site), blogText(site)]);
  return <PostList site={site} posts={posts} t={t} />;
}

/** Published posts are prerendered; a newly published one is filled in on its first visit. */
export async function postParams(site: Site) {
  const posts = await getPosts(site);
  // the build needs at least one value to prerender the page shell
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "first-post" }];
}

export async function postMeta(site: Site, params: Promise<{ slug: string }>): Promise<Metadata> {
  const post = await getPost(site, (await params).slug);
  if (!post) return { title: SITE_INFO[site].name, robots: { index: false } };
  const meta = pageMeta(site, `blog/${post.slug}`, `${post.title} | ${SITE_INFO[site].name}`, post.excerpt);
  if (post.cover) meta.openGraph = { ...meta.openGraph, type: "article", publishedTime: post.published_at ?? undefined, images: [{ url: post.cover, alt: post.cover_alt }] };
  if (post.cover) meta.twitter = { ...meta.twitter, images: [post.cover] };
  return meta;
}

export function PostRoute({ site, params }: { site: Site; params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <PostBody site={site} params={params} />
    </Suspense>
  );
}

async function PostBody({ site, params }: { site: Site; params: Promise<{ slug: string }> }) {
  const [post, t] = await Promise.all([params.then(({ slug }) => getPost(site, slug)), blogText(site)]);
  if (!post) notFound();
  return (
    <>
      <PostArticle site={site} post={post} t={t} />
      <PostStructuredData site={site} post={post} />
    </>
  );
}
