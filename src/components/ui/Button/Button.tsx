import Link from "next/link"

import s from './Button.module.css'

import type { VFC } from "react"

type LinkProps = {
  label: string,
  link: string
}

export const ButtonLink: VFC<LinkProps> = (props) => (
  <div className={s.buttonLink}>
    <Link href={props.link}>
      {props.label}
    </Link>
  </div>
)
