import { getContent } from "@/lib/content/get";
import { pageMeta } from "@/lib/seo";
import { RccHome } from "@/components/rcc/Pages";

export async function generateMetadata() {
  const c = await getContent("rcc");
  return pageMeta("rcc", "", c["seo.title"], c["seo.description"]);
}

export default async function Page() {
  return <RccHome c={await getContent("rcc")} />;
}
