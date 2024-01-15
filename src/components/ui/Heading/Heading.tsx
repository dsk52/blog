import { clsx } from "clsx";

import { headingClasses } from "./util";

import type { HeadingProps } from "./type";

export const Heading = ({
  as: Tag = "h1",
  className = "",
  children,
}: HeadingProps) => (
  <Tag className={clsx("tw-font-bold", headingClasses(Tag), className)}>
    {children}
  </Tag>
);
