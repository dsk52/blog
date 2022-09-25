import s from './Article.module.css'

import type { ArticleProps } from "./type";

export const Article = ({ children }: ArticleProps) => (
  <article className={s.article}>
    {children}
  </article>
)

export const ArticleHeader = ({ children }: ArticleProps) => (
  <header className={s.articleHeader}>
    {children}
  </header>
)

export const ArticleBody = ({ children }: ArticleProps) => (
  <div className={s.articleBody}>
    {children}
  </div>
)

export const ArticleFooter = ({ children }: ArticleProps) => (
  <div className={s.articleFooter}>
    {children}
  </div>
)
