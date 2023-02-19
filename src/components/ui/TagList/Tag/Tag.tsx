import Link from "next/link";

import { ROUTE } from "@/constants/route";

import s from "./Tag.module.css";

import type { TagItem } from "@/components/ui/TagList/type";

export const Tag = ({ name, slug, doLink = false }: TagItem) => {
  if (!doLink) {
    return <span className={s.tag}>#{name}</span>;
  }

  return (
    <Link href={ROUTE.postTagList(slug, 1)} className={s.tagLink}>
      <>#{name}</>
    </Link>
  );
};
