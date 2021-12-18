import s from './TagList.module.css'

import type { ITag } from '../../../types/domain/Post';
import type { Props } from "./type";
import type { VFC } from "react";

export const TagList: VFC<Props> = ({ tags }) => (
  <ul className={s.tagList}>
    {tags.map((tag: ITag) => (
      <li
        key={tag.slug}
        className={s.tagItem}
      >
        #{tag.name}
      </li>
    ))}
  </ul>
)
