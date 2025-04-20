import { NextConfig } from "next";

const {
  MICROCMS_API_KEY,
  MICROCMS_SERVICE_DOMAIN,
  NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT,
  NEXT_PUBLIC_ADS_ARTICLE_IN_SLOT,
  NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT,
} = process.env;

const nextConfig: NextConfig = {
  reactStrictMode: true,

  pageExtensions: ["ts", "tsx"],

  eslint: {
    ignoreDuringBuilds: true,
  },

  serverRuntimeConfig: {
    MICROCMS_API_KEY,
    MICROCMS_SERVICE_DOMAIN,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_ADS_ARTICLE_TOP_SLOT,
    NEXT_PUBLIC_ADS_ARTICLE_IN_SLOT,
    NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT,
  },
};

export default nextConfig;
