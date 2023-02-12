import Link from 'next/link';

import { TagList } from "@/components/ui/TagList/TagList";
import { datetimeToDate } from "@/utilities/Date";

import s from './PostItem.module.css'

import type { Props } from "./type";

export const PostItem = ({ post }: Props) => {
  const pubDate = datetimeToDate(post.publishedAt)

  return (
    <article>
      <div className={s.title}>
        <Link href={`/post/${encodeURIComponent(post.slug)}`}>
          {post.title}
        </Link>
      </div>
      <div className={s.meta}>
        <time
          className={s.date}
          dateTime={post.publishedAt}
        >
          {pubDate}
        </time>
        <TagList tags={post.tags} className={s.tagList} />
      </div>
    </article>
  )
}
