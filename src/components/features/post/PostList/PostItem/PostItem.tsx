import { clsx } from "clsx";

import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";
import { TagList } from "@/components/ui/TagList/TagList";
import { ROUTE } from "@/constants/route";
import { datetimeToDate } from "@/utilities/Date";

import type { Props } from "./type";

export const PostItem = ({ post }: Props) => {
  const pubDate = datetimeToDate(post.publishedAt);

  return (
    <article>
      <AnchorLink
        href={ROUTE.postDetail(post.slug)}
        className={clsx("tw:text-2xl tw:font-semibold", "tw:hover:underline")}
      >
        {post.title}
      </AnchorLink>
      <aside
        className={clsx(
          "tw:flex tw:flex-wrap tw:justify-start tw:mt-1.5 tw:gap-x-3",
        )}
      >
        <time dateTime={post.publishedAt}>{pubDate}</time>
        <TagList tags={post.tags} className={clsx("tw:gap-x-2")} />
      </aside>
    </article>
  );
};
