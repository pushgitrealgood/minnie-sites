import type { Metadata } from "next";
import { getContent } from "@/lib/content/get";
import { RccFooter, RccHeader } from "@/components/rcc/Chrome";
import { EditMode } from "@/components/EditMode";
import { Analytics } from "@/components/Analytics";
import { RccStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = { icons: { icon: "/img/rcc/RCC-logo.png" } };

export default async function RccLayout({ children }: LayoutProps<"/rcc">) {
  const c = await getContent("rcc");
  return (
    <div className="flex min-h-dvh flex-col bg-white font-sans text-navy">
      <RccHeader />
      <main className="flex-1">{children}</main>
      <RccFooter c={c} />
      <EditMode site="rcc" />
      <Analytics site="rcc" />
      <RccStructuredData c={c} />
    </div>
  );
}
