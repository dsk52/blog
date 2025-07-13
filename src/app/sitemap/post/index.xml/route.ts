import type { ISitemapField } from "next-sitemap";
import { getServerSideSitemap } from "next-sitemap";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getAllPost, POST_PER_PAGE } from "@/libs/microcms";

export async function GET(_request: Request) {
  const posts = await getAllPost();

  const totalPage = Math.ceil(posts.totalCount / POST_PER_PAGE);

  const sitemapPaths = Array.from(Array(totalPage)).map((_, pageCount) => {
    const paths: ISitemapField = {
      loc: `${SITE.url}${ROUTE.postList(pageCount + 1)}`,
      changefreq: "weekly",
      priority: 0.5,
    };
    return paths;
  });

  return getServerSideSitemap(sitemapPaths);
}
