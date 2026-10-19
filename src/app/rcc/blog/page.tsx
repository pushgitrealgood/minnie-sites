import { BlogIndex, blogMeta } from "@/components/BlogRoutes";

export const generateMetadata = () => blogMeta("rcc");

export default function Page() {
  return <BlogIndex site="rcc" />;
}
