import { getServerSideSitemapLegacy } from "next-sitemap";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { POST_PER_PAGE, getAllPost } from "@/libs/microcms";

import type { GetServerSideProps } from "next/types";
import type { ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

  return getServerSideSitemapLegacy(ctx, sitemapPaths);
};

export default function SitemapPost() {}
