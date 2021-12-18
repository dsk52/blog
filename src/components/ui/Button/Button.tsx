import Link from "next/link"

import s from './Button.module.css'

import type { LinkProps } from "./type"
import type { VFC } from "react"

export const ButtonLink: VFC<LinkProps> = (props) => (
  <div className={s.buttonLink}>
    <Link href={props.link}>
      {props.label}
    </Link>
  </div>
)
