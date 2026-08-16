import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  pageExtensions: ["ts", "tsx"],
  serverExternalPackages: ["markdown-it-prism"],
};

export default nextConfig;
