import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ["@scandalorian/ui", "@scandalorian/theme"],
};

export default nextConfig;
