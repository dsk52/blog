import { clsx } from "clsx";

import type { HeadingProps } from "@/components/ui/Heading/type";

export const headingClasses = (tag: HeadingProps["as"]) => {
  switch (tag) {
    case "h1":
      return clsx("tw-text-3xl tw-leading-loose");

    case "h2":
      return clsx("tw-text-2xl tw-leading-relaxed");

    default:
      return clsx("tw-text-lg tw-leading");
  }
};
