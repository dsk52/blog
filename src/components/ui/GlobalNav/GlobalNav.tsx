import Link from "next/link"

import s from './style.module.css'

import type { VFC } from 'react';


export const GlobalNav: VFC = () => (
  <nav className={s.GlobalNav}>
    <Link href="/about"><a>About</a></Link>
    <Link href="/post/tags"><a>タグ一覧</a></Link>
  </nav>
)
