import Link from "next/link"

import s from './Button.module.css'

import type { FC, ReactNode } from "react"

type LinkProps = {
  children: ReactNode,
  link: string
}

export const ButtonLink: FC<LinkProps> = (props) => (
  <div className={s.buttonLink}>
    <Link href={props.link}>
      {props.children}
    </Link>
  </div>
)
