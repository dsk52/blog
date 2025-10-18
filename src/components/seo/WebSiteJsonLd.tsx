import type { WebSite, WithContext } from "schema-dts";
import { SITE } from "@/constants/site";

/**
 * WebSiteのJSON-LD構造化データを生成する
 */
function generateWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    inLanguage: "ja-JP",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
  };
}

/**
 * WebSiteのJSON-LD構造化データを出力するコンポーネント
 */
export function WebSiteJsonLd() {
  const jsonLd = generateWebSiteJsonLd();

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD構造化データの出力に必要
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
