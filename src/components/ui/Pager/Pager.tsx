import { ButtonLink } from "@/components/ui/Button/Button";

import s from "./Pager.module.css";

import type { PagerProps } from "./type";

export const Pager = ({ basePath, pageNum, maxPage }: PagerProps) => {
  const prevPageNum = pageNum - 1;
  const nextPageNum = pageNum + 1;

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
      ) : (
        <div></div>
      )}

      {pageNum !== maxPage ? (
        <ButtonLink
          label="次のページへ"
          link={`${basePath}/${nextPageNum}`}
          data-testid="next"
        />
      ) : (
        <div></div>
      )}
    </nav>
  );
};
