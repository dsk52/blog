import s from './style.module.css'

import type { ReactNode } from "react"


type Props = {
  children: ReactNode
}

export const Container = ({ children }: Props) => (
  <div className={s.container}>{children}</div>
)
