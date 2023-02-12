import getConfig from "next/config";
import Head from "next/head"
import { useMemo } from "react";

import { SITE } from '@/constants/site';

import { generateIndexAttriubtes } from "./util";

import type { Props } from "./type";

const { publicRuntimeConfig } = getConfig()
const { NEXT_PUBLIC_ADSENSE_CLIENT } = publicRuntimeConfig

const MyHead = ({ title = '', description = '', url = '', canonicalUrl, image = '', pageType = 'website', index = '' }: Props): JSX.Element => {
  if (!description) {
    description = SITE.description;
  }

  const metaTitle = useMemo(() => {
    if (title.length) {
      return `${title} | ${SITE.name} `
    } else {
      return `${SITE.name} | ${description}`
    }
  }, [description, title])

  const metaUrl = useMemo(() => `${SITE.url}${url}`, [url]);

  const metaCanonicalUrl = useMemo(() => {
    return canonicalUrl ? `${SITE.url}${canonicalUrl}` : metaUrl
  }, [canonicalUrl, metaUrl])

  const indexAttriubtes = generateIndexAttriubtes(index)

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#404344" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="robots" content={indexAttriubtes} />
      <meta name="google-site-verification" content="ZleDkg20Lnn9txQhSeRginHpbqqiJX9ISbx3f8gqF-A" />
      <title key="title">{metaTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={metaUrl} />b
      {image === null ? "" : (
        <meta property="og:image" content={image} />
      )}
      <meta
        property="og:site_name"
        content={`${SITE.name} | ${SITE.description}`}
      />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@skd_nw" />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={description} />
      {image == null ? "" : (
        <meta name="twitter:image" content={image} />
      )}
      <link rel="canonical" href={metaCanonicalUrl} />
      <script
        data-ad-client={NEXT_PUBLIC_ADSENSE_CLIENT}
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>
    </Head>
  )
}

export default MyHead
