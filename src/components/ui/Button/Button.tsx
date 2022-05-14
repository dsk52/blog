import Link from "next/link"

import s from './Button.module.css'

import type { LinkProps } from "./type"

export const ButtonLink = (props: LinkProps) => (
  <div className={s.buttonLink}>
    <Link href={props.link}>
      {props.label}
    </Link>
  </div>
)
