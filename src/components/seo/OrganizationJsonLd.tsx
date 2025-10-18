import type { Organization, WithContext } from "schema-dts";
import { SITE } from "@/constants/site";

/**
 * OrganizationのJSON-LD構造化データを生成する
 */
function generateOrganizationJsonLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.ogp.imageUrl}`,
    sameAs: ["https://twitter.com/skd_nw"],
  };
}

/**
 * OrganizationのJSON-LD構造化データを出力するコンポーネント
 */
export function OrganizationJsonLd() {
  const jsonLd = generateOrganizationJsonLd();

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
