import { clsx } from "clsx";

import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";

import type { Props } from "./type";

export const ButtonLink = (props: Props) => (
  <AnchorLink
    href={props.link}
    className={clsx(
      "tw-inline-block tw-py-[0.4em] tw-px-[0.6em] tw-border tw-border-black",
      "tw-transition tw-duration-400 tw-delay-0",
      "hover:tw-bg-black hover:tw-text-white hover:tw-opacity-70",
    )}
  >
    {props.label}
  </AnchorLink>
);
