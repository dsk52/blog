import type { ISitemapField } from "next-sitemap";
import { getServerSideSitemap } from "next-sitemap";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getAllSlugs } from "@/libs/microcms";

const POST_PER_PAGE = 1000;

export async function GET(_request: Request) {
  const posts = await getAllSlugs(POST_PER_PAGE);

  while (posts.contents.length < posts.totalCount) {
    const response = await getAllSlugs(POST_PER_PAGE, posts.contents.length);
    posts.contents.push(...response.contents);
  }

  const sitemapPaths = posts.contents.map((content) => {
    const paths: ISitemapField = {
      loc: `${SITE.url}${ROUTE.postDetail(content.slug)}`,
      changefreq: "daily",
      lastmod: new Date(content.updatedAt).toISOString(),
      priority: 0.9,
    };
    return paths;
  });

  return getServerSideSitemap(sitemapPaths);
};
