import style from './Title.module.css'

import type { Props } from './type'

export const MainTitle = ({ children }: Props) => (
  <h1 className={style.mainTitle}>{children}</h1>
)
