import { getContent } from "@/lib/content/get";
import { pageMeta } from "@/lib/seo";
import { RccTopic } from "@/components/rcc/Pages";

export async function generateMetadata() {
  const c = await getContent("rcc");
  return pageMeta("rcc", "resilience", c["resilience.seoTitle"], c["seo.description"]);
}

export default async function Page() {
  return <RccTopic c={await getContent("rcc")} topic="resilience" />;
}
