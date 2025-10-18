import { render } from "@testing-library/react";
import type { WebSite, WithContext } from "schema-dts";
import { describe, expect, it } from "vitest";
import { SITE } from "@/constants/site";
import { WebSiteJsonLd } from "./WebSiteJsonLd";

describe("WebSiteJsonLd", () => {
  it("正しいJSON-LD構造化データを出力する", () => {
    const { container } = render(<WebSiteJsonLd />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();

    if (!script?.textContent) {
      throw new Error("script.textContentがnullです");
    }

    const jsonLd = JSON.parse(script.textContent) as WithContext<WebSite>;

    // @contextと@typeの検証
    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("WebSite");

    // 基本プロパティの検証
    expect(jsonLd.name).toBe(SITE.name);
    expect(jsonLd.description).toBe(SITE.description);
    expect(jsonLd.url).toBe(SITE.url);
    expect(jsonLd.inLanguage).toBe("ja-JP");

    // publisherの検証
    expect(jsonLd.publisher).toBeDefined();
    expect(jsonLd.publisher).toEqual({
      "@type": "Organization",
      name: SITE.name,
    });
  });

  it("有効なJSONとしてパースできる", () => {
    const { container } = render(<WebSiteJsonLd />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();

    if (!script?.textContent) {
      throw new Error("script.textContentがnullです");
    }

    // JSON.parseがエラーを投げないことを確認
    expect(() => JSON.parse(script.textContent as string)).not.toThrow();
  });

  it("必須フィールドがすべて含まれている", () => {
    const { container } = render(<WebSiteJsonLd />);

    const script = container.querySelector('script[type="application/ld+json"]');
    if (!script?.textContent) {
      throw new Error("script.textContentがnullです");
    }

    const jsonLd = JSON.parse(script.textContent) as WithContext<WebSite>;

    // Schema.org WebSiteの必須フィールド
    expect(jsonLd.name).toBeDefined();
    expect(jsonLd.url).toBeDefined();

    // SEO最適化のための重要フィールド
    expect(jsonLd.description).toBeDefined();
    expect(jsonLd.publisher).toBeDefined();
  });

  it("SITE定数の値が正しく反映されている", () => {
    const { container } = render(<WebSiteJsonLd />);

    const script = container.querySelector('script[type="application/ld+json"]');
    if (!script?.textContent) {
      throw new Error("script.textContentがnullです");
    }

    const jsonLd = JSON.parse(script.textContent) as WithContext<WebSite>;

    // SITE定数からの値が正しく設定されていることを確認
    expect(jsonLd.name).toBe("PengNote");
    expect(jsonLd.description).toBe("勉強した事や行った場所の感想を書くブログ");
    expect(jsonLd.url).toBe("https://blog.daisukekonishi.com");
  });
});
