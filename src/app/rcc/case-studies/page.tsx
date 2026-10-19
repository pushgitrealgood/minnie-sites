import { getContent } from "@/lib/content/get";
import { pageMeta } from "@/lib/seo";
import { RccCaseStudies } from "@/components/rcc/Pages";

export async function generateMetadata() {
  const c = await getContent("rcc");
  const meta = pageMeta("rcc", "case-studies", c["caseStudies.seoTitle"], c["caseStudies.intro"]);
  // an empty page shouldn't be in Google until there's something on it
  return c.caseStudies.length ? meta : { ...meta, robots: { index: false } };
}

export default async function Page() {
  return <RccCaseStudies c={await getContent("rcc")} />;
}
