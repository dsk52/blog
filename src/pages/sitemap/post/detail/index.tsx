import { getServerSideSitemapLegacy } from "next-sitemap";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getAllSlugs } from "@/libs/microcms";

import type { GetServerSideProps } from "next/types";
import type { ISitemapField } from "next-sitemap";

const POST_PER_PAGE = 1000;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await getAllSlugs(POST_PER_PAGE);

  while (posts.totalCount > POST_PER_PAGE) {
    const response = await getAllSlugs(
      POST_PER_PAGE,
      posts.contents.length + 1,
    );
    posts.contents = [...posts.contents, ...response.contents];
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

  return getServerSideSitemapLegacy(ctx, sitemapPaths);
};

export default function SitemapPostDetail() {}
