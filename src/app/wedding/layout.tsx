import type { Metadata } from "next";
import { getContent } from "@/lib/content/get";
import { WeddingFooter, WeddingHeader } from "@/components/wedding/Chrome";
import { EditMode } from "@/components/EditMode";
import { Analytics } from "@/components/Analytics";
import { WeddingStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = { icons: { icon: "/img/wedding/flower-heart.png" } };

export default async function WeddingLayout({ children }: LayoutProps<"/wedding">) {
  const c = await getContent("wedding");
  return (
    <div className="flex min-h-dvh flex-col bg-cream font-serif text-ink">
      <WeddingHeader />
      <main className="flex-1">{children}</main>
      <WeddingFooter c={c} />
      <EditMode site="wedding" />
      <Analytics site="wedding" />
      <WeddingStructuredData c={c} />
    </div>
  );
}
