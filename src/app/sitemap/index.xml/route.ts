import { getServerSideSitemapIndex } from "next-sitemap";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

export async function GET(request: Request) {
  const sitemapBaseUrl = `${SITE.url}${ROUTE.sitemap}`;

  return getServerSideSitemapIndex([
    `${sitemapBaseUrl}/common`,
    `${sitemapBaseUrl}/post`,
    `${sitemapBaseUrl}/post/detail`,
    `${sitemapBaseUrl}/post/tags`,
  ]);
};

