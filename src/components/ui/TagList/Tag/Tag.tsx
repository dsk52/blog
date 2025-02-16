import { clsx } from "clsx";

import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";
import { ROUTE } from "@/constants/route";

import type { TagProps } from "./type";

export const Tag = ({ name, slug, doLink = false }: TagProps) => {
  const label = `#${name}`;

  if (!doLink) {
    return (
      <span
        className={clsx("tw:leading tw:cursor-default")}
        data-testid="nonLinkTag" // NOTE: spanタグを上手く探すのが難しいのでtestIdをふっている
      >
        {label}
      </span>
    );
  }

  return (
    <AnchorLink
      href={ROUTE.postTagList(slug, 1)}
      className={clsx("tw:leading tw:underline", "tw:hover:no-underline")}
    >
      {label}
    </AnchorLink>
  );
};
