import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SITE } from "@/constants/site";
import { PersonJsonLd } from "./PersonJsonLd";

describe("PersonJsonLd", () => {
  it("有効なJSONとしてパースできる", () => {
    const { container } = render(<PersonJsonLd />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();

    if (!script?.textContent) {
      throw new Error("script.textContentがnullです");
    }

    // JSON.parseがエラーを投げないことを確認
    expect(() => JSON.parse(script.textContent as string)).not.toThrow();
  });

  it("正しいJSON-LD構造化データを出力する", () => {
    const { container } = render(<PersonJsonLd />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();

    if (!script?.textContent) {
      throw new Error("script.textContentがnullです");
    }

    const jsonLd = JSON.parse(script.textContent);

    // @contextと@typeの検証
    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("Person");

    // 基本プロパティの検証
    expect(jsonLd.name).toBe(SITE.author.name);
    expect(jsonLd.url).toBe(SITE.author.url);
    expect(jsonLd.image).toBe(`${SITE.url}${SITE.ogp.imageUrl}`);
    expect(jsonLd.sameAs).toEqual(["https://twitter.com/skd_nw"]);
  });

  it("必須フィールドがすべて含まれている", () => {
    const { container } = render(<PersonJsonLd />);

    const script = container.querySelector('script[type="application/ld+json"]');
    if (!script?.textContent) {
      throw new Error("script.textContentがnullです");
    }

    const jsonLd = JSON.parse(script.textContent);

    // Schema.org Personの必須フィールド
    expect(jsonLd.name).toBeDefined();

    // SEO最適化のための重要フィールド
    expect(jsonLd.url).toBeDefined();
    expect(jsonLd.image).toBeDefined();
    expect(jsonLd.sameAs).toBeDefined();
  });

  it("SITE定数の値が正しく反映されている", () => {
    const { container } = render(<PersonJsonLd />);

    const script = container.querySelector('script[type="application/ld+json"]');
    if (!script?.textContent) {
      throw new Error("script.textContentがnullです");
    }

    const jsonLd = JSON.parse(script.textContent);

    // SITE定数からの値が正しく設定されていることを確認
    expect(jsonLd.name).toBe("Daisuke KONISHI");
    expect(jsonLd.url).toBe("https://daisukekonishi.com");
    expect(jsonLd.image).toBe("https://blog.daisukekonishi.com/images/ogp.png");
  });

  it("SNSアカウント情報が含まれている", () => {
    const { container } = render(<PersonJsonLd />);

    const script = container.querySelector('script[type="application/ld+json"]');
    if (!script?.textContent) {
      throw new Error("script.textContentがnullです");
    }

    const jsonLd = JSON.parse(script.textContent);

    // sameAsフィールドにTwitterアカウントが含まれていることを確認
    expect(jsonLd.sameAs).toBeInstanceOf(Array);
    expect(jsonLd.sameAs).toContain("https://twitter.com/skd_nw");
  });
});
