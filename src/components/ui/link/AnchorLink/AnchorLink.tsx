import Link from "next/link";

import s from "./Anchor.module.css";

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
      className={`${s.anchor} ${className}`}
      target={target}
    >
      {children}
    </Link>
  );
};
