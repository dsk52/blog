import { clsx } from "clsx";
import Link from "next/link";

import type { Props } from "./type";

export const AnchorLink = ({
  children,
  href,
  className,
  target = "_self",
}: Props) => {
  return (
    <Link
      href={href ?? "#"}
      className={clsx("tw-transition-opacity hover:tw-opacity-70", className)}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
};
