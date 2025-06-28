import ogs from "open-graph-scraper";

export interface OGPData {
  url: string;
  title: string;
  description?: string;
  image?: string;
  siteName?: string;
  fallback: boolean;
}

// メモリ内キャッシュ（シンプルなMap）
const ogpCache = new Map<string, { data: OGPData; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1時間

/**
 * URLからOGP情報を取得する
 * タイムアウト・エラーハンドリング・キャッシュ機能付き
 */
export async function fetchOGP(
  url: string,
  options: { timeout?: number } = {},
): Promise<OGPData> {
  const { timeout = 3000 } = options;

  // キャッシュチェック
  const cached = ogpCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    // タイムアウト付きでOGP取得
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Timeout")), timeout);
    });

    const ogpPromise = ogs({
      url,
      onlyGetOpenGraphInfo: true,
      timeout: timeout - 100, // 少し短めに設定
    });

    const { result } = await Promise.race([ogpPromise, timeoutPromise]);

    const ogpData: OGPData = {
      url,
      title: result.ogTitle || result.twitterTitle || url,
      description: result.ogDescription || result.twitterDescription,
      image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url,
      siteName: result.ogSiteName,
      fallback: false,
    };

    // キャッシュに保存
    ogpCache.set(url, { data: ogpData, timestamp: Date.now() });

    return ogpData;
  } catch (error) {
    console.warn(`Failed to fetch OGP for ${url}:`, error);

    // フォールバックデータ
    const fallbackData: OGPData = {
      url,
      title: url,
      fallback: true,
    };

    return fallbackData;
  }
}

/**
 * 複数URLのOGP情報を並列取得する
 */
export async function fetchMultipleOGP(urls: string[]): Promise<OGPData[]> {
  const promises = urls.map((url) => fetchOGP(url));
  return Promise.all(promises);
}

/**
 * キャッシュをクリアする（テスト用）
 */
export function clearOGPCache(): void {
  ogpCache.clear();
}
