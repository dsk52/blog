/**
 * 指定文字列から改行・HTMLタグを除いた上で指定文字列抜粋する
 *
 * @param body 指定文字列
 * @param excerptNuNum 抜き出す文字数
 * @returns
 */
export const createExcerptFromBody = (body: string, excerptNuNum: number): string => {
  return body
    .replace(/\r?\n/g, "")
    .replace(/<("[^"]*"|'[^']*'|[^'">]|\r?\n)*>/g, "")
    .slice(0, excerptNuNum - 1);
};

export const isDraft = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === "string");
