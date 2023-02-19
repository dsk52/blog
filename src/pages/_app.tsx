import "sanitize.css";
import "../styles/globals.css";

import getConfig from "next/config";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import React from "react";

import { SITE } from "@/constants/site";
import { useInitTagManager } from "@/hooks/useInitTagManager";
import { GTM_ID } from "@/libs/gtm";

import type { AppProps } from "next/app";

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_ADSENSE_CLIENT } = publicRuntimeConfig;

function MyApp({ Component, pageProps }: AppProps) {
  const title = `${SITE.name} | ${SITE.description}`;
  const image = {
    url: `${SITE.url}${SITE.ogp.imageUrl}`,
    width: 450,
    height: 279,
  };

  useInitTagManager({ gtmId: GTM_ID });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#404344" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="google-site-verification"
          content="ZleDkg20Lnn9txQhSeRginHpbqqiJX9ISbx3f8gqF-A"
        />
        <script
          data-ad-client={NEXT_PUBLIC_ADSENSE_CLIENT}
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
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
