import Link from "next/link"

import { ROUTE } from '../../../constants/route';
import s from './style.module.css'


export const GlobalNav = () => (
  <nav className={s.GlobalNav}>
    <Link href={ROUTE.about}><a>About</a></Link>
    <Link href={ROUTE.tagList}><a>タグ一覧</a></Link>
  </nav>
)
