import { getServerSideSitemap } from "next-sitemap";

import { SITE } from "@/constants/site";

export async function GET(_request: Request) {
  const lastmod = new Date().toISOString();

  return getServerSideSitemap([
    {
      loc: `${SITE.url}`,
      lastmod,
      changefreq: "daily",
      priority: 0.7,
    },
    {
      loc: `${SITE.url}/about`,
      lastmod,
      changefreq: "monthly",
      priority: 0.3,
    },
    {
      loc: `${SITE.url}/post/tags`,
      lastmod,
      changefreq: "weekly",
      priority: 0.6,
    },
  ]);
};
