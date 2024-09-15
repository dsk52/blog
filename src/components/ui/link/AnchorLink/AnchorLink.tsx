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
      className={clsx(
        "tw-transition-colors tw-duration-200 tw-delay-0 hover:tw-text-primary",
        className,
      )}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
};
