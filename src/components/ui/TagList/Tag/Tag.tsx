import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";
import { ROUTE } from "@/constants/route";

import s from "./Tag.module.css";

import type { TagItem } from "@/components/ui/TagList/type";

export const Tag = ({ name, slug, doLink = false }: TagItem) => {
  if (!doLink) {
    return <span className={s.tag}>#{name}</span>;
  }

  return (
    <AnchorLink href={ROUTE.postTagList(slug, 1)} className={s.tagLink}>
      <>#{name}</>
    </AnchorLink>
  );
};
