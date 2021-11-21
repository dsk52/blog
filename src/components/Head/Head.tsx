import Head from "next/head"

import { siteName, sideDescription, siteURL } from '../../constants/site';

import type { VFC } from "react";

type Index = 'index' | 'followOnly' | ''

type Props = {
  title: string
  description: string
  url: string
  image?: string
  pageType: 'website' | 'article'
  index: Index
}

const Index = (index: Index): string => {
  switch (index) {
    case 'index':
      return 'index, follow'

    case 'followOnly':
      return 'noindex, follow'

    default:
      return 'noindex';
  }
}

const MyHead: VFC<Props> = ({ title = '', description = '', url = '', image = '', pageType = 'website', index = '' }): JSX.Element => {
  if (!description) {
    description = sideDescription;
  }

  let propTitle = `${siteName} | ${description}`
  if (title.length) {
    propTitle = `${title} | ${siteName}`
  }

  const metaUrl = `${siteURL}/${url}`;

  const indexStr = Index(index)

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#404344" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="robots" content={indexStr} />
      <meta name="google-site-verification" content="ZleDkg20Lnn9txQhSeRginHpbqqiJX9ISbx3f8gqF-A" />
      <title key="title">{propTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={propTitle} />
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={metaUrl} />b
      {image == null ? "" : (
        <meta property="og:image" content={image} />
      )}
      <meta
        property="og:site_name"
        content={`${siteName} | ${description}`}
      />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@skd_nw" />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={propTitle} />
      <meta name="twitter:description" content={description} />
      {image == null ? "" : (
        <meta name="twitter:image" content={image} />
      )}
      <link rel="canonical" href={metaUrl} />
    </Head>
  )
}

export default MyHead
