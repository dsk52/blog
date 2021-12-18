import Link from 'next/link';

import { datetimeToDate } from '../../../utilities/Date';
import { TagList } from '../TagList/TagList';
import s from './PostItem.module.css'

import type { Props } from "./type";
import type { VFC } from "react";

export const PostItem: VFC<Props> = ({ post }) => {
  const pubDate = datetimeToDate(post.publishedAt)

  return (
    <>
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
        <TagList tags={post.tags} />
      </div>
    </>
  )
}
