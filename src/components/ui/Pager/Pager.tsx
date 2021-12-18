import { ButtonLink } from "../Button/Button"
import s from './Pager.module.css'

import type { PagerProps } from "./type"
import type { VFC } from "react"

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
