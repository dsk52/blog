import { NextSeo } from "next-seo";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

import type { SeoProps } from "./type";

export const Seo = ({ tag, pageNum }: SeoProps) => {
  const title = `${tag.name}タグの記事一覧 | ${SITE.name}`;
  const description = `${tag.name}タグに関連する記事の一覧です`;
  const url = ROUTE.postTagList(tag.slug, pageNum);

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={ROUTE.postTagList(tag.slug, 1)}
      openGraph={{
        title,
        url,
        type: "website",
      }}
    />
  );
};
