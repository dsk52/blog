import Head from "next/head"

import { siteName } from '../../constants/site';


const MyHead = ({ title = '', description = '', url = '', image = '' }): JSX.Element => {
  let propTitle = `${siteName} | ${description}`
  if (title.length) {
    propTitle = `${title} | ${siteName}`
  }

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#404344" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="robots" content="noindex,follow" />
      <title key="title">{propTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={propTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />b
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
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={propTitle} />
      <meta name="twitter:description" content={description} />
      {image == null ? "" : (
        <meta name="twitter:image" content={image} />
      )}
      <link rel="canonical" href={url} />
    </Head>
  )
}

export default MyHead
