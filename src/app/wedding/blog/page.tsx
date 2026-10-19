import { BlogIndex, blogMeta } from "@/components/BlogRoutes";

export const generateMetadata = () => blogMeta("wedding");

export default function Page() {
  return <BlogIndex site="wedding" />;
}
