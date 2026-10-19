import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pages are prerendered and cached; saving an edit clears that site's content tag (src/lib/content/get.ts)
  cacheComponents: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "oqfngjejlvlcbckoxlra.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
