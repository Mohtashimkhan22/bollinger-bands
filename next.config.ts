import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,  // ✅ skip ESLint
  },
  typescript: {
    ignoreBuildErrors: true,   // ✅ skip TS errors
  },
};

export default nextConfig;
