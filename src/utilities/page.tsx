/**
 *
 * @param currnetPageNum 現在のページ番号
 * @param postPerPage 1ページ辺りの表示件数
 * @returns
 */
export function calcOffset(currnetPageNum: number, postPerPage: number): number {
  return currnetPageNum > 0 ? postPerPage * currnetPageNum : 0;
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
