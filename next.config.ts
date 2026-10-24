import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Keep development independent of the last successful production build.
  distDir: process.env.NODE_ENV === "development" ? ".dev" : ".next",
  devIndicators: false,
  experimental: { cpus: 2 },
};
export default nextConfig;
