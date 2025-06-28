export interface BlogCardUrl {
  url: string;
  fullMatch: string;
}

/**
 * レンダリング済みHTMLからブログカード対象のURLを抽出
 * aタグでhref属性とリンクテキストが同じURLの場合のみ対象とする
 */
export function extractBlogCardUrls(html: string): BlogCardUrl[] {
  // aタグでhref属性とテキストが同じURLパターンをマッチ
  const linkRegex = /<a\s+href=["']?(https?:\/\/[^"'\s>]+)["']?[^>]*>\s*\1\s*<\/a>/gi;
  
  return Array.from(html.matchAll(linkRegex), ([fullMatch, url]) => ({
    url,
    fullMatch,
  }));
}

/**
 * HTMLからブログカード対象URLを置換する
 * 後でブログカードコンポーネントの実装時に使用
 */
export function replaceBlogCardUrls(
  html: string,
  blogCardUrls: BlogCardUrl[],
  replacer: (url: string) => string,
): string {
  let result = html;
  
  for (const { url, fullMatch } of blogCardUrls) {
    const replacement = replacer(url);
    result = result.replace(fullMatch, replacement);
  }
  
  return result;
}