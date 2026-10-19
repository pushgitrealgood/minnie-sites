import { getContent } from "@/lib/content/get";
import { pageMeta } from "@/lib/seo";
import { RccLegal } from "@/components/rcc/Pages";

export async function generateMetadata() {
  const c = await getContent("rcc");
  return pageMeta("rcc", "legal", c["legal.seoTitle"], c["seo.description"]);
}

export default async function Page() {
  return <RccLegal c={await getContent("rcc")} />;
}
