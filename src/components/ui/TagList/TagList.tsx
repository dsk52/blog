import { clsx } from "clsx";

import { Tag } from "./Tag/Tag";
import type { TagListProps } from "./type";

export const TagList = ({ tags, className, doLink = false }: TagListProps) => (
  <ul
    className={clsx(
      "tw-flex tw-flex-wrap tw-list-none tw-align-middle tw-pl-0 tw-gap-x-4 tw-gap-y-5",
      className,
    )}
  >
    {tags.map((tag) => (
      <li key={tag.slug} className={clsx("tw-no-underline")}>
        <Tag {...tag} doLink={doLink} />
      </li>
    ))}
  </ul>
);
