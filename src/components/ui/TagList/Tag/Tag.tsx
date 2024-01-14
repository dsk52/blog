import { clsx } from "clsx";

import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";
import { ROUTE } from "@/constants/route";

import type { TagProps } from "./type";

export const Tag = ({ name, slug, doLink = false }: TagProps) => {
  if (!doLink) {
    return (
      <span className={clsx("tw-leading tw-cursor-default")}>#{name}</span>
    );
  }

  return (
    <AnchorLink
      href={ROUTE.postTagList(slug, 1)}
      className={clsx("tw-leading tw-underline", "hover:tw-no-underline")}
    >
      <>#{name}</>
    </AnchorLink>
  );
};
