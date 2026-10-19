import type { Metadata } from "next";
import { getContent } from "@/lib/content/get";
import { getPosts } from "@/lib/posts";
import { RccFooter, RccHeader } from "@/components/rcc/Chrome";
import { EditMode } from "@/components/EditMode";
import { Analytics } from "@/components/Analytics";
import { RccStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/img/rcc/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/img/rcc/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/img/rcc/apple-icon.png",
  },
};

export default async function RccLayout({ children }: LayoutProps<"/rcc">) {
  const [c, posts] = await Promise.all([getContent("rcc"), getPosts("rcc")]);
  return (
    <div className="flex min-h-dvh flex-col bg-white font-sans text-navy">
      <RccHeader blogLabel={posts.length ? c["blog.title"] : undefined} caseStudiesLabel={c.caseStudies.length ? c["caseStudies.nav"] : undefined} />
      <main className="flex-1">{children}</main>
      <RccFooter c={c} />
      <EditMode site="rcc" />
      <Analytics site="rcc" />
      <RccStructuredData c={c} />
    </div>
  );
}
