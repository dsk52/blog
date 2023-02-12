import { NextSeo } from "next-seo";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

import type { SeoProps } from "./type";

export const Seo = ({ title: pageTitle, slug, publishedAt }: SeoProps) => {
  const title = `${pageTitle} | ${SITE.name}`;
  const description = SITE.description;
  const url = `${SITE.url}${ROUTE.postDetail(slug)}`;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        title,
        url,
        type: "article",
        article: {
          publishedTime: publishedAt,
        },
      }}
    />
  );
};
