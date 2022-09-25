import s from './style.module.css'
import { ContainerProps } from "./type"

export const Container = ({ children }: ContainerProps) => (
  <div className={s.container}>{children}</div>
)
