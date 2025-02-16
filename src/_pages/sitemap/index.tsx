import type { GetServerSideProps } from "next/types";
import { getServerSideSitemapIndexLegacy } from "next-sitemap";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sitemapBaseUrl = `${SITE.url}${ROUTE.sitemap}`;

  return getServerSideSitemapIndexLegacy(ctx, [
    `${sitemapBaseUrl}/common`,
    `${sitemapBaseUrl}/post`,
    `${sitemapBaseUrl}/post/detail`,
    `${sitemapBaseUrl}/post/tags`,
  ]);
};

export default function SitemapIndex() {}
