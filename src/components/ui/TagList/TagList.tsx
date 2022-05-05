import Link from "next/link";

import s from './TagList.module.css'

import type { ITag } from '../../../types/domain/Post';
import type { Props, TagItem } from "./type";
import type { VFC } from "react";

export const TagList: VFC<Props> = ({ tags, doLink = false }) => (
  <ul className={s.tagList}>
    {tags.map((tag: ITag) => (
      <li
        key={tag.slug}
        className={s.tagListItem}
      >
        <Tag {...tag} doLink={doLink} />
      </li>
    ))}
  </ul>
)

export const Tag: VFC<TagItem> = ({ name, slug, doLink = false }) => {
  const link = doLink ? `/post/tags/${slug}/1` : '#'

  return (
    <Link href={link}>
      <a className={doLink ? s.tagLink : s.tag}>
        #{name}
      </a>
    </Link>
  )
}
