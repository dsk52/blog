import { getServerSideSitemapIndexLegacy } from "next-sitemap";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

import type { GetServerSideProps } from "next/types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sitemapBaseUrl = `${SITE.url}${ROUTE.sitemap}`;

  return getServerSideSitemapIndexLegacy(ctx, [
    `${sitemapBaseUrl}/post`,
    `${sitemapBaseUrl}/post/detail`,
    `${sitemapBaseUrl}/post/tags`,
  ]);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
