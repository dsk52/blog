
import { ButtonLink } from "../Button/Button"
import s from './Pager.module.css'

import type { VFC } from "react"

export type PageBaseProp = {
  maxPage: number,
  pageNum: number
}

type PagerProps = {
  basePath: string
} & PageBaseProp

export const Pager: VFC<PagerProps> = (props) => (
  <nav className={s.pagerWrapper}>
    {props.pageNum !== 1 ? (
      <ButtonLink
        label="前のページへ"
        link={`${props.basePath}/${props.pageNum - 1}`}
      />
    ) : <div></div>}

    {props.pageNum !== props.maxPage ? (
      <ButtonLink
        label="次のページへ"
        link={`${props.basePath}/${props.pageNum + 1}`}
      />
    ) : <div></div>}
  </nav>
)
