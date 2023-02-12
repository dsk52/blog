import { NextSeo } from "next-seo";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

export const Seo = () => {
  const title = `About | ${SITE.description}`;
  const description = "PengNoteのAboutページです";
  const url = `${SITE.url}${ROUTE.about}`;

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
