import { beforeEach, describe, expect, it, vi } from "vitest";

import { clearOGPCache, fetchMultipleOGP, fetchOGP } from "./ogp";

// open-graph-scraperをモック
vi.mock('open-graph-scraper', () => ({
  default: vi.fn(),
}));

const mockOgs = vi.mocked((await import('open-graph-scraper')).default);

describe("fetchOGP", () => {
  beforeEach(() => {
    clearOGPCache();
    vi.clearAllMocks();
  });

  it("正常なOGP情報を取得する", async () => {
    const mockResult = {
      error: false,
      html: "",
      response: {},
      result: {
        ogTitle: "テストタイトル",
        ogDescription: "テスト説明",
        ogImage: [{ url: "https://example.com/image.jpg" }],
        ogSiteName: "テストサイト",
      }
    } satisfies { error: false; html: string; response: object; result: object };
    
    mockOgs.mockResolvedValue(mockResult);
    
    const result = await fetchOGP("https://example.com");
    
    expect(result).toEqual({
      url: "https://example.com",
      title: "テストタイトル",
      description: "テスト説明",
      image: "https://example.com/image.jpg",
      siteName: "テストサイト",
      fallback: false,
    });
  });

  it("OGタグがない場合はTwitterタグを使用する", async () => {
    const mockResult = {
      error: false,
      html: "",
      response: {},
      result: {
        twitterTitle: "Twitterタイトル",
        twitterDescription: "Twitter説明",
        twitterImage: [{ url: "https://example.com/twitter.jpg" }],
      }
    } satisfies { error: false; html: string; response: object; result: object };
    
    mockOgs.mockResolvedValue(mockResult);
    
    const result = await fetchOGP("https://example.com");
    
    expect(result.title).toBe("Twitterタイトル");
    expect(result.description).toBe("Twitter説明");
    expect(result.image).toBe("https://example.com/twitter.jpg");
  });

  it("エラー時はフォールバックデータを返す", async () => {
    mockOgs.mockRejectedValue(new Error("Network error"));
    
    const result = await fetchOGP("https://example.com");
    
    expect(result).toEqual({
      url: "https://example.com",
      title: "https://example.com",
      fallback: true,
    });
  });

  it("タイムアウト時はフォールバックデータを返す", async () => {
    // 長時間かかるPromiseをモック
    mockOgs.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 5000)));
    
    const result = await fetchOGP("https://example.com", { timeout: 100 });
    
    expect(result.fallback).toBe(true);
    expect(result.url).toBe("https://example.com");
  });

  it("キャッシュが機能する", async () => {
    const mockResult = {
      error: false,
      html: "",
      response: {},
      result: {
        ogTitle: "キャッシュテスト",
      }
    } satisfies { error: false; html: string; response: object; result: object };
    
    mockOgs.mockResolvedValue(mockResult);
    
    // 1回目の呼び出し
    const result1 = await fetchOGP("https://example.com");
    expect(mockOgs).toHaveBeenCalledTimes(1);
    
    // 2回目の呼び出し（キャッシュから取得）
    const result2 = await fetchOGP("https://example.com");
    expect(mockOgs).toHaveBeenCalledTimes(1); // 増えていない
    
    expect(result1).toEqual(result2);
  });

  it("タイトルが取得できない場合はURLをタイトルとして使用", async () => {
    const mockResult = {
      error: false,
      html: "",
      response: {},
      result: {} // 空のresult
    } satisfies { error: false; html: string; response: object; result: object };
    
    mockOgs.mockResolvedValue(mockResult);
    
    const result = await fetchOGP("https://example.com");
    
    expect(result.title).toBe("https://example.com");
    expect(result.fallback).toBe(false);
  });
});

describe("fetchMultipleOGP", () => {
  beforeEach(() => {
    clearOGPCache();
    vi.clearAllMocks();
  });

  it("複数URLのOGP情報を並列取得する", async () => {
    const mockResult1 = {
      error: false,
      html: "",
      response: {},
      result: { ogTitle: "サイト1" }
    } satisfies { error: false; html: string; response: object; result: object };
    const mockResult2 = {
      error: false,
      html: "",
      response: {},
      result: { ogTitle: "サイト2" }
    } satisfies { error: false; html: string; response: object; result: object };
    
    mockOgs
      .mockResolvedValueOnce(mockResult1)
      .mockResolvedValueOnce(mockResult2);
    
    const results = await fetchMultipleOGP([
      "https://site1.com",
      "https://site2.com"
    ]);
    
    expect(results).toHaveLength(2);
    expect(results[0].title).toBe("サイト1");
    expect(results[1].title).toBe("サイト2");
    expect(mockOgs).toHaveBeenCalledTimes(2);
  });

  it("一部のURLでエラーが発生してもすべての結果を返す", async () => {
    const mockResult = {
      error: false,
      html: "",
      response: {},
      result: { ogTitle: "成功サイト" }
    } satisfies { error: false; html: string; response: object; result: object };
    
    mockOgs
      .mockResolvedValueOnce(mockResult)
      .mockRejectedValueOnce(new Error("失敗"));
    
    const results = await fetchMultipleOGP([
      "https://success.com",
      "https://fail.com"
    ]);
    
    expect(results).toHaveLength(2);
    expect(results[0].title).toBe("成功サイト");
    expect(results[0].fallback).toBe(false);
    expect(results[1].title).toBe("https://fail.com");
    expect(results[1].fallback).toBe(true);
  });
});