import { ButtonLink } from "../Button/Button"
import s from './Pager.module.css'

import type { PagerProps } from "./type"
import type { VFC } from "react"

export const Pager: VFC<PagerProps> = ({ basePath, pageNum, maxPage }) => {
  const prevPageNum = pageNum - 1
  const nextPageNum = pageNum + 1

  /**
   * microCMSのoffsetとしては0スタートだけど、
   * ブログのアプリケーションとしてページ番号0は気持ち悪いので避ける
   */

  return (
    <nav className={s.pagerWrapper}>
      {prevPageNum > 0 ? (
        <ButtonLink
          label="前のページへ"
          link={`${basePath}/${prevPageNum}`}
          data-testid="prev"
        />
      ) : <div></div>}

      {pageNum !== maxPage ? (
        <ButtonLink
          label="次のページへ"
          link={`${basePath}/${nextPageNum}`}
          data-testid="next"
        />
      ) : <div></div>}
    </nav>
  )
}

/**
 *
 * @param currnetPageNum 現在のページ番号
 * @param postPerPage 1ページ辺りの表示件数
 * @returns
 */
export function calcOffset(currnetPageNum: number, postPerPage: number): number {
  if (currnetPageNum <= 1) {
    return 0
  }

  return postPerPage * (currnetPageNum - 1);
}

/**
 * 最大ページ数を返す
 *
 * @param totalCount
 * @param postPerPage
 * @returns
 */
export function calcMaxPage(totalCount: number, postPerPage: number): number {
  return Math.ceil(totalCount / postPerPage)
}
