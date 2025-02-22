import { clsx } from "clsx";

import type { HeadingProps } from "./type";
import { headingClasses } from "./util";

export const Heading = ({
  as: Tag = "h1",
  className = "",
  children,
}: HeadingProps) => (
  <Tag className={clsx("tw:font-bold", headingClasses(Tag), className)}>
    {children}
  </Tag>
);
