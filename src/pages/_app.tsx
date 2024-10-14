import "sanitize.css";
import "../styles/globals.css";
import "prismjs/themes/prism-tomorrow.min.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import { SITE } from "@/constants/site";
import { useInitTagManager } from "@/hooks/useInitTagManager";
import { useTransition } from "@/hooks/useTransition";
import { GTM_ID } from "@/libs/gtm";

function MyApp({ Component, pageProps }: AppProps) {
  useInitTagManager({ gtmId: GTM_ID });
  useTransition();

  const title = `${SITE.name} | ${SITE.description}`;
  const image = {
    url: `${SITE.url}${SITE.ogp.imageUrl}`,
    width: 450,
    height: 279,
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#fbf5ec" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="google-site-verification"
          content="ZleDkg20Lnn9txQhSeRginHpbqqiJX9ISbx3f8gqF-A"
        />
      </Head>

      <DefaultSeo
        title={title}
        openGraph={{
          title,
          locale: "ja-JP",
          type: "website",
          url: SITE.url,
          siteName: SITE.name,
          images: [image],
        }}
        twitter={{
          site: "@skd_nw",
          handle: SITE.name,
          cardType: "summary",
        }}
      />

      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
