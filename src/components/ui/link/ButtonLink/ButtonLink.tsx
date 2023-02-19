import { AnchorLink } from "@/components/ui/link/AnchorLink/AnchorLink";

import s from "./ButtonLink.module.css";

import type { Props } from "./type";

export const ButtonLink = (props: Props) => (
  <AnchorLink href={props.link} className={s.buttonLink}>
    {props.label}
  </AnchorLink>
);
