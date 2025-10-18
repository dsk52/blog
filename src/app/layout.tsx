import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";
import { SITE } from "@/constants/site";
import { AppProvider } from "@/provider/AppProvider";

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  openGraph: {
    locale: "ja-JP",
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.url}${SITE.ogp.imageUrl}`,
        width: 450,
        height: 279,
      },
    ],
  },
  twitter: {
    site: "@skd_nw",
    title: SITE.name,
    card: "summary",
  },
  verification: {
    google: "ZleDkg20Lnn9txQhSeRginHpbqqiJX9ISbx3f8gqF-A",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf5ec",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <WebSiteJsonLd />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
