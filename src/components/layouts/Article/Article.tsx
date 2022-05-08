import s from './Article.module.css'

import type { ReactNode } from 'react';



type Props = {
  children: ReactNode
}

export const Article = ({ children }: Props) => (
  <article className={s.article}>
    {children}
  </article>
)

export const ArticleHeader = ({ children }: Props) => (
  <header className={s.articleHeader}>
    {children}
  </header>
)


export const ArticleBody = ({ children }: Props) => (
  <div className={s.articleBody}>
    {children}
  </div>
)

export const ArticleFooter = ({ children }: Props) => (
  <div className={s.articleFooter}>
    {children}
  </div>
)
