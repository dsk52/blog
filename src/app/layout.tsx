import type { Metadata } from "next"
import { type ReactNode } from "react"

import { SITE } from "@/constants/site";
import { useInitTagManager } from "@/hooks/useInitTagManager";
import { useTransition } from "@/hooks/useTransition";
import { GTM_ID } from "@/libs/gtm";

const title = `${SITE.name} | ${SITE.description}`;



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

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  useInitTagManager({ gtmId: GTM_ID });
  useTransition();

  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  )
}
