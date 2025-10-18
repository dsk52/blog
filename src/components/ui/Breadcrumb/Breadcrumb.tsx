import { clsx } from "clsx";
import type { BreadcrumbList, WithContext } from "schema-dts";
import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";
import { SITE } from "@/constants/site";
import type { BreadcrumbItem, BreadcrumbProps } from "./type";

/**
 * パンくずリストのJSON-LD構造化データを生成する
 */
function generateBreadcrumbListJsonLd(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
      .filter((item) => item.href) // hrefがある項目のみ（最後の現在ページは除外）
      .map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: item.href?.startsWith("http") ? item.href : `${SITE.url}${item.href}`,
      })),
  };
}

export const Breadcrumb = ({ items, className, includeJsonLd = true }: BreadcrumbProps) => {
  return (
    <>
      {includeJsonLd && (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD構造化データの出力に必要
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbListJsonLd(items)),
          }}
        />
      )}
      <nav aria-label="パンくずリスト" className={clsx("tw:text-sm", className)}>
        <ol className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.href ?? item.label} className="tw:flex tw:items-center tw:gap-2">
                {item.href && !isLast ? (
                  <AnchorLink href={item.href} className="tw:text-gray-600 hover:tw:text-primary">
                    {item.label}
                  </AnchorLink>
                ) : (
                  <span
                    className={clsx(
                      isLast ? "tw:text-gray-900 tw:font-medium" : "tw:text-gray-600"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className="tw:text-gray-400" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
