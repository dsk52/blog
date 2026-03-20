import type { ComponentProps } from "react";

export type BreadcrumbItem = {
  label: string;
  href: NonNullable<ComponentProps<"a">["href"]>;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: ComponentProps<"nav">["className"];
  includeJsonLd?: boolean;
};
