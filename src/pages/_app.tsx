import "sanitize.css";
import "../styles/globals.css";

import React from "react";

import { GoogleAnalytics } from "../components/Head/GoogleAnalytivs";
import usePageview from '../hooks/usePageView';

import type { AppProps } from "next/app";


function MyApp({ Component, pageProps }: AppProps) {
  usePageview()

  return (
    <>
      <GoogleAnalytics />

      <Component {...pageProps} />
    </>
  )
}
export default MyApp;
