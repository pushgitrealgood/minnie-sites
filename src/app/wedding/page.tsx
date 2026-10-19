import { getContent } from "@/lib/content/get";
import { pageMeta } from "@/lib/seo";
import { WeddingHome } from "@/components/wedding/Pages";

export async function generateMetadata() {
  const c = await getContent("wedding");
  return pageMeta("wedding", "", c["seo.title"], c["seo.description"]);
}

export default async function Page() {
  return <WeddingHome c={await getContent("wedding")} />;
}
