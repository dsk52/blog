import { clsx } from "clsx";

import type { HeadingProps } from "./type";

export const Heading = ({
  as: Tag = "h1",
  className = "",
  children,
}: HeadingProps) => (
  <Tag
    className={clsx(
      "tw-font-bold tw-text-lg",
      Tag === "h1" && "tw-text-2xl",
      className,
    )}
  >
    {children}
  </Tag>
);
