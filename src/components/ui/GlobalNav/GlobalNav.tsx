import Link from "next/link"

import { ROUTE } from '../../../constants/route';
import s from './style.module.css'


export const GlobalNav = () => (
  <nav className={s.GlobalNav}>
    <Link href={ROUTE.about}>About</Link>
    <Link href={ROUTE.tagList}>タグ一覧</Link>
  </nav>
)
