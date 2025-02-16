import type { GetServerSideProps } from "next/types";
import { getServerSideSitemapLegacy } from "next-sitemap";

import { SITE } from "@/constants/site";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const lastmod = new Date().toISOString();

  return getServerSideSitemapLegacy(ctx, [
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

export default function SitemapIndex() {}
