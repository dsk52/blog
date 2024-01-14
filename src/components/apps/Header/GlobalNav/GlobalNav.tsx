import { clsx } from "clsx";

import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";

import { NAV_ITEM } from "./const";

export const GlobalNav = () => (
  <nav className={clsx("tw-flex tw-flex-wrap tw-gap-x-4")}>
    {NAV_ITEM.map((item) => (
      <AnchorLink
        href={item.href}
        key={item.href}
        className={clsx("tw-text-md tw-font-medium")}
      >
        {item.label}
      </AnchorLink>
    ))}
  </nav>
);
