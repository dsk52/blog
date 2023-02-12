import s from './style.module.css'

import type { ContainerProps } from "./type"

export const Container = ({ children }: ContainerProps) => (
  <div className={s.container}>{children}</div>
)
