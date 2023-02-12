import { NextSeo } from "next-seo";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

export const Seo = () => {
  const title = `タグ一覧 | ${SITE.name}`;
  const description = "記事に関連するタグの一覧ページです";
  const url = `${SITE.url}${ROUTE.top}`;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        title,
        url,
        type: "website",
      }}
    />
  );
};
