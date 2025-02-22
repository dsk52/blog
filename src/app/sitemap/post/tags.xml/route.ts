import type { ISitemapField } from "next-sitemap";
import { getServerSideSitemap } from "next-sitemap";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getTags } from "@/libs/microcms";

export async function GET(_request: Request) {
  const tags = await getTags();

  const sitemapPaths = tags.contents.map((tag) => {
    const paths: ISitemapField = {
      loc: `${SITE.url}${ROUTE.postTagList(tag.slug, 1)}`, // NOTE: とりあえず1ページ目のみ指定
      changefreq: "weekly",
      priority: 0.4,
    };
    return paths;
  });

  return getServerSideSitemap(sitemapPaths);
};
