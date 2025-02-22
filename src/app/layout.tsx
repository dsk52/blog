import type { Metadata, Viewport } from "next"
import { type ReactNode } from "react"

import { SITE } from "@/constants/site";
import { AppProvider } from "@/provider/AppProvider";

const title = `${SITE.name} | ${SITE.description}`;

import "@/styles/globals.css";

export const metadata: Metadata = {
  title,
  openGraph: {
    title,
    locale: "ja-JP",
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    images: [{
      url: `${SITE.url}${SITE.ogp.imageUrl}`,
      width: 450,
      height: 279,
    }],
  },
  twitter: {
    site: "@skd_nw",
    title: SITE.name,
    card: "summary",
  },
  verification: {
    google: 'ZleDkg20Lnn9txQhSeRginHpbqqiJX9ISbx3f8gqF-A'
  },
}

export const viewport: Viewport = {
  themeColor: '#fbf5ec',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
