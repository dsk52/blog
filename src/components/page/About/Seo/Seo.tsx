import { NextSeo } from "next-seo";

import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";

export const Seo = () => {
  const title = `About | ${SITE.description}`;
  const description = "PengNoteのAboutページです";
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={ROUTE.about}
      openGraph={{
        title,
        url: ROUTE.about,
        type: "website",
      }}
    />
  );
};
