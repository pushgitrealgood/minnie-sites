import { PostRoute, postMeta, postParams } from "@/components/BlogRoutes";

export const generateStaticParams = () => postParams("wedding");

export const generateMetadata = ({ params }: PageProps<"/wedding/blog/[slug]">) => postMeta("wedding", params);

export default function Page({ params }: PageProps<"/wedding/blog/[slug]">) {
  return <PostRoute site="wedding" params={params} />;
}
