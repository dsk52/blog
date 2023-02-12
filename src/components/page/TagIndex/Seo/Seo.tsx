import { NextSeo } from "next-seo";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

export const Seo = () => {
  const title = `タグ一覧 | ${SITE.name}`;
  const description = "記事に関連するタグの一覧ページです";

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={ROUTE.tagList}
      openGraph={{
        title,
        url: ROUTE.tagList,
        type: "website",
      }}
    />
  );
};
