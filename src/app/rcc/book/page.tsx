import { getContent } from "@/lib/content/get";
import { pageMeta } from "@/lib/seo";
import { RccBook } from "@/components/rcc/Pages";

export async function generateMetadata() {
  const c = await getContent("rcc");
  return pageMeta("rcc", "book", c["book.seoTitle"], c["seo.description"]);
}

export default async function Page() {
  return <RccBook c={await getContent("rcc")} />;
}
