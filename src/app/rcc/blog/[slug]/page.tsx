import { PostRoute, postMeta, postParams } from "@/components/BlogRoutes";

export const generateStaticParams = () => postParams("rcc");

export const generateMetadata = ({ params }: PageProps<"/rcc/blog/[slug]">) => postMeta("rcc", params);

export default function Page({ params }: PageProps<"/rcc/blog/[slug]">) {
  return <PostRoute site="rcc" params={params} />;
}
