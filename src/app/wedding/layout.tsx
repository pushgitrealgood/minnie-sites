import type { Metadata } from "next";
import { getContent } from "@/lib/content/get";
import { getPosts } from "@/lib/posts";
import { WeddingFooter, WeddingHeader } from "@/components/wedding/Chrome";
import { EditMode } from "@/components/EditMode";
import { Analytics } from "@/components/Analytics";
import { WeddingStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/img/wedding/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/img/wedding/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/img/wedding/apple-icon.png",
  },
};

export default async function WeddingLayout({ children }: LayoutProps<"/wedding">) {
  const [c, posts] = await Promise.all([getContent("wedding"), getPosts("wedding")]);
  return (
    <div className="flex min-h-dvh flex-col bg-cream font-serif text-ink">
      <WeddingHeader blogLabel={posts.length ? c["blog.title"] : undefined} />
      <main className="flex-1">{children}</main>
      <WeddingFooter c={c} />
      <EditMode site="wedding" />
      <Analytics site="wedding" />
      <WeddingStructuredData c={c} />
    </div>
  );
}
