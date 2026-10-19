import { getContent } from "@/lib/content/get";
import { pageMeta } from "@/lib/seo";
import { WeddingFaq } from "@/components/wedding/Pages";

export async function generateMetadata() {
  const c = await getContent("wedding");
  return pageMeta("wedding", "faq", "FAQs | Thoroughly Modern Minnie, Wedding Celebrant", c["seo.description"]);
}

export default async function Page() {
  return <WeddingFaq c={await getContent("wedding")} />;
}
