import { getContent } from "@/lib/content/get";
import { pageMeta } from "@/lib/seo";
import { RccAbout } from "@/components/rcc/Pages";

export async function generateMetadata() {
  const c = await getContent("rcc");
  return pageMeta("rcc", "about-us", c["about.seoTitle"], c["seo.description"]);
}

export default async function Page() {
  return <RccAbout c={await getContent("rcc")} />;
}
