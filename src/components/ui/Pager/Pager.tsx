import { ButtonLink } from "../Button/Button"
import s from './Pager.module.css'

import type { PagerProps } from "./type"
import type { VFC } from "react"

export const Pager: VFC<PagerProps> = (props) => {
  const prevPageNum = props.pageNum - 1
  const nextPageNum = props.pageNum + 1

  return (
    <nav className={s.pagerWrapper}>
      {prevPageNum >= 0 ? (
        <ButtonLink
          label="前のページへ"
          link={`${props.basePath}/${prevPageNum}`}
        />
      ) : <div></div>}

      {props.pageNum !== props.maxPage ? (
        <ButtonLink
          label="次のページへ"
          link={`${props.basePath}/${nextPageNum}`}
        />
      ) : <div></div>}
    </nav>
  )
}
