import type { OGPData } from "./ogp";

/**
 * OGPデータからBlogCardのHTML文字列を生成する
 * ReactコンポーネントをHTML文字列として出力するためのヘルパー関数
 */
export function generateBlogCardHTML(ogpData: OGPData): string {
  const { url, title, description, image, siteName, fallback } = ogpData;

  // フォールバック時は通常のリンク
  if (fallback) {
    return `<a href="${url}" target="_blank" rel="noopener" class="tw:text-primary tw:underline tw:transition-colors hover:tw:no-underline hover:tw:opacity-70">${url}</a>`;
  }

  // サイト名またはホスト名
  const displaySiteName = siteName || new URL(url).hostname;

  // 画像部分のHTML
  const imageHTML = image
    ? `<div class="tw:flex-shrink-0 tw:w-32 tw:h-32">
         <img src="${image}" alt="${title}のサムネイル" class="tw:w-full tw:h-full tw:object-cover tw:mt-0 tw:mb-0" loading="lazy">
       </div>`
    : "";

  // 説明部分のHTML
  const descriptionHTML = description
    ? `<p class="tw:text-gray-600 tw:text-xs tw:leading-4 tw:line-clamp-2">${description}</p>`
    : "";

  return `
    <article class="tw:min-h-32 tw:border tw:border-gray-200 tw:bg-gray-50 tw:rounded-md">
       <a href="${url}" target="_blank" rel="noopener" class="tw:flex tw:items-center tw:overflow-hidden tw:transition-all tw:duration-200 hover:tw:border-gray-300 hover:tw:shadow-md tw:no-underline hover:tw:no-underline tw:my-0">
        ${imageHTML}
        <div class="tw:flex-1 tw:p-4 tw:flex tw:flex-col tw:justify-between tw:min-w-0">
          <div>
            <p class="tw:font-semibold tw:text-gray-900 tw:text-sm tw:leading-5 tw:line-clamp-2 tw:mb-1">${title}</p>
            ${descriptionHTML}
          </div>
          <div class="tw:mt-2">
            <p class="tw:text-gray-500 tw:text-xs tw:truncate">${displaySiteName}</p>
          </div>
        </div>
      </a>
    </article>
  `
    .replace(/\s+/g, " ")
    .trim();
}
