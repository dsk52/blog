import { clsx } from "clsx";
import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";
import type { BreadcrumbProps } from "./type";

export const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  return (
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
                  className={clsx(isLast ? "tw:text-gray-900 tw:font-medium" : "tw:text-gray-600")}
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
  );
};
