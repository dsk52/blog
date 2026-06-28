/**
 *
 * @param currnetPageNum 現在のページ番号
 * @param postPerPage 1ページ辺りの表示件数
 * @returns
 */
export function calcOffset(currnetPageNum: number, postPerPage: number): number {
  if (currnetPageNum <= 1) {
    return 0;
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
  return Math.ceil(totalCount / postPerPage);
}

export function parsePageNum(pageNumParam: string): number | undefined {
  if (!/^[1-9]\d*$/.test(pageNumParam)) {
    return undefined;
  }

  const pageNum = Number(pageNumParam);

  if (!Number.isSafeInteger(pageNum)) {
    return undefined;
  }

  return pageNum;
}
