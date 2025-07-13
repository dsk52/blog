import { describe, expect, it } from "vitest";

import { extractBlogCardUrls, replaceBlogCardUrls } from "./blogCard";

describe("extractBlogCardUrls", () => {
  it("aタグでhref属性とテキストが同じURLの場合、正しく抽出する", () => {
    const html = '<p><a href="https://example.com">https://example.com</a></p>';
    const result = extractBlogCardUrls(html);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      url: "https://example.com",
      fullMatch: '<a href="https://example.com">https://example.com</a>',
    });
  });

  it("複数のURLが含まれている場合、すべて抽出する", () => {
    const html = `
      <p><a href="https://example.com">https://example.com</a></p>
      <p><a href="https://google.com">https://google.com</a></p>
    `;
    const result = extractBlogCardUrls(html);

    expect(result).toHaveLength(2);
    expect(result[0].url).toBe("https://example.com");
    expect(result[1].url).toBe("https://google.com");
  });

  it("href属性とテキストが異なる場合は抽出しない", () => {
    const html = '<p><a href="https://example.com">サンプルサイト</a></p>';
    const result = extractBlogCardUrls(html);

    expect(result).toHaveLength(0);
  });

  it("httpURLも正しく抽出する", () => {
    const html = '<p><a href="http://example.com">http://example.com</a></p>';
    const result = extractBlogCardUrls(html);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("http://example.com");
  });

  it("aタグがない場合は抽出しない", () => {
    const html = "<p>https://example.com</p>";
    const result = extractBlogCardUrls(html);

    expect(result).toHaveLength(0);
  });

  it("シングルクォートのhref属性も正しく処理する", () => {
    const html = "<p><a href='https://example.com'>https://example.com</a></p>";
    const result = extractBlogCardUrls(html);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com");
  });

  it("クォートなしのhref属性も正しく処理する", () => {
    const html = "<p><a href=https://example.com>https://example.com</a></p>";
    const result = extractBlogCardUrls(html);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com");
  });

  it("aタグに追加属性がある場合も正しく処理する", () => {
    const html =
      '<p><a href="https://example.com" target="_blank" rel="noopener">https://example.com</a></p>';
    const result = extractBlogCardUrls(html);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com");
  });

  it("URLの前後に空白がある場合も正しく処理する", () => {
    const html = '<p><a href="https://example.com">  https://example.com  </a></p>';
    const result = extractBlogCardUrls(html);

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://example.com");
  });
});

describe("replaceBlogCardUrls", () => {
  it("検出したURLを指定した文字列で置換する", () => {
    const html = '<p><a href="https://example.com">https://example.com</a></p>';
    const blogCardUrls = extractBlogCardUrls(html);
    const result = replaceBlogCardUrls(html, blogCardUrls, (url) => `[BlogCard: ${url}]`);

    expect(result).toBe("<p>[BlogCard: https://example.com]</p>");
  });

  it("複数のURLを正しい順序で置換する", () => {
    const html = `
      <p><a href="https://first.com">https://first.com</a></p>
      <p><a href="https://second.com">https://second.com</a></p>
    `;
    const blogCardUrls = extractBlogCardUrls(html);
    const result = replaceBlogCardUrls(html, blogCardUrls, (url) => `[${url}]`);

    expect(result).toContain("[https://first.com]");
    expect(result).toContain("[https://second.com]");
  });

  it("URLがない場合は元のHTMLをそのまま返す", () => {
    const html = "<p>普通のテキストです</p>";
    const blogCardUrls = extractBlogCardUrls(html);
    const result = replaceBlogCardUrls(html, blogCardUrls, (url) => `[${url}]`);

    expect(result).toBe(html);
  });
});
