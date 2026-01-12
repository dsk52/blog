import type { Person, WithContext } from "schema-dts";
import { SITE } from "@/constants/site";

/**
 * PersonのJSON-LD構造化データを生成する
 */
function generatePersonJsonLd(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": SITE.author.id,
    name: SITE.author.name,
    url: SITE.author.url,
    image: `${SITE.url}${SITE.ogp.imageUrl}`,
    sameAs: ["https://twitter.com/skd_nw"],
  };
}

/**
 * PersonのJSON-LD構造化データを出力するコンポーネント
 */
export function PersonJsonLd() {
  const jsonLd = generatePersonJsonLd();

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
