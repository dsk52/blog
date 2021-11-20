import s from './Article.module.css'

import type { FC } from 'react'


export const Article: FC = (props) => (
  <article className={s.article}>
    {props.children}
  </article>
)

export const ArticleHeader: FC = (props) => (
  <header className={s.articleHeader}>
    {props.children}
  </header>
)


export const ArticleBody: FC = (props) => (
  <div className={s.articleBody}>
    {props.children}
  </div>
)

export const ArticleFooter: FC = (props) => (
  <div className={s.articleFooter}>
    {props.children}
  </div>
)
