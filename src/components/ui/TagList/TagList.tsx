import { Tag } from "./Tag/Tag";
import s from "./TagList.module.css";

import type { Props } from "./type";
import type { ITag } from "@/types/domain/Post";

export const TagList = ({ tags, className, doLink = false }: Props) => (
  <ul className={`${s.tagList} ${className && className}`}>
    {tags.map((tag: ITag) => (
      <li key={tag.slug} className={s.tagListItem}>
        <Tag {...tag} doLink={doLink} />
      </li>
    ))}
  </ul>
);
