import Link from "next/link";

import s from './TagList.module.css'

import type { Props, TagItem } from "./type";
import type { ITag } from '../../../types/domain/Post';

export const TagList = ({ tags, className, doLink = false }: Props) => (
  <ul className={`${s.tagList} ${className && className}`}>
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
  if (!doLink) {
    return <span className={s.tag}>#{name}</span>
  }

  return (
    <Link href={`/post/tags/${slug}/1`} className={s.tagLink}>
      <>
        #{name}
      </>
    </Link>
  )
}
