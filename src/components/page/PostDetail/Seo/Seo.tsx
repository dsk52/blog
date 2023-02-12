import { ArticleJsonLd, NextSeo } from "next-seo";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

import type { SeoProps } from "./type";

export const Seo = ({ title: pageTitle, slug, publishedAt }: SeoProps) => {
  const title = `${pageTitle} | ${SITE.name}`;
  const description = SITE.description;
  const url = `${SITE.url}${ROUTE.postDetail(slug)}`;
  const image = {
    url: `${SITE.url}${SITE.ogp.imageUrl}`,
    width: 450,
    height: 279,
  };

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title,
          url,
          images: [image],
          type: "article",
          article: {
            publishedTime: publishedAt,
          },
        }}
      />
      <ArticleJsonLd
        url={url}
        title={title}
        images={[image.url]}
        datePublished={publishedAt}
        authorName={SITE.author.name}
        description={description}
      />
    </>
  );
};
