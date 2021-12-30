import { FC } from "react";

import s from './style.module.css'

export const Container: FC = props => (
  <div className={s.container}>{props.children}</div>
)
