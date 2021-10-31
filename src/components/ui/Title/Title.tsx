import style from './Title.module.css'

import type { FC } from "react";


export const MainTitle: FC = (props) => (
  <h1 className={style.mainTitle}>{props.children}</h1>
)
