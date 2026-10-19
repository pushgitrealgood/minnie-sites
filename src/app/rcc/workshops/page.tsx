import { getContent } from "@/lib/content/get";
import { pageMeta } from "@/lib/seo";
import { RccWorkshops } from "@/components/rcc/Pages";

export async function generateMetadata() {
  const c = await getContent("rcc");
  return pageMeta("rcc", "workshops", c["workshops.seoTitle"], c["seo.description"]);
}

export default async function Page() {
  return <RccWorkshops c={await getContent("rcc")} />;
}
