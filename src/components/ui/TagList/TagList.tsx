import Link from "next/link";

import s from './TagList.module.css'

import type { ITag } from '../../../types/domain/Post';
import type { Props, TagItem } from "./type";

export const TagList = ({ tags, doLink = false }: Props) => (
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

export const Tag = ({ name, slug, doLink = false }: TagItem) => {
  const link = doLink ? `/post/tags/${slug}/1` : '#'

  return (
    <Link href={link}>
      <a className={doLink ? s.tagLink : s.tag}>
        #{name}
      </a>
    </Link>
  )
}
