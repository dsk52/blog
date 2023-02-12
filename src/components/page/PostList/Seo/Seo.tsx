import { NextSeo } from "next-seo";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

import type { SeoProps } from "./type";

export const Seo = ({ pageNum }: SeoProps) => {
  const title = `記事一覧 | ${SITE.name}`;
  const description = "今までに書いた記事の一覧ページです";

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={`${SITE.url}${ROUTE.postList(1)}`}
      openGraph={{
        title,
        url: `${SITE.url}${ROUTE.postList(pageNum)}`,
        type: "website",
      }}
    />
  );
};
