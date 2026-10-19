import { getContent } from "@/lib/content/get";
import { pageMeta } from "@/lib/seo";
import { WeddingEnquire } from "@/components/wedding/Pages";

export async function generateMetadata() {
  const c = await getContent("wedding");
  return pageMeta("wedding", "enquire", "Enquire | Thoroughly Modern Minnie, Wedding Celebrant", c["seo.description"]);
}

export default async function Page() {
  return <WeddingEnquire c={await getContent("wedding")} />;
}
