import { clsx } from "clsx";

import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";

import type { Props } from "./type";

export const ButtonLink = ({ link, label }: Props) => (
  <AnchorLink
    href={link}
    className={clsx(
      "tw:inline-block tw:py-[0.4em] tw:px-[0.6em] tw:border tw:border-black",
      "tw:transition-colors tw:duration-200 tw:delay-0",
      "tw:hover:bg-primary tw:hover:border-primary tw:hover:text-white tw:hover:opacity-70",
    )}
  >
    {label}
  </AnchorLink>
);
