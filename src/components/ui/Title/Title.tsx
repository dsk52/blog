import style from './Title.module.css'

import type { ReactNode } from "react";


type Props = {
  children: ReactNode
}

export const MainTitle = ({ children }: Props) => (
  <h1 className={style.mainTitle}>{children}</h1>
)
