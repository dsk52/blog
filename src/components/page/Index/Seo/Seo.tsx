import { NextSeo } from "next-seo";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

export const Seo = () => {
  const title = `${SITE.name} | ${SITE.description}`;
  const description = SITE.description;
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
