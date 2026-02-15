import { describe, expect, it } from "vitest";

import { renderSitemapIndexXml, renderUrlSetXml } from "./xml";

describe("renderSitemapIndexXml", () => {
  it("sitemapindex XMLを生成する", () => {
    const xml = renderSitemapIndexXml([
      "https://example.com/sitemap/0.xml",
      "https://example.com/sitemap/1.xml",
    ]);

    expect(xml).toContain("<sitemapindex");
    expect(xml).toContain("<loc>https://example.com/sitemap/0.xml</loc>");
    expect(xml).toContain("<loc>https://example.com/sitemap/1.xml</loc>");
  });
});

describe("renderUrlSetXml", () => {
  it("urlset XMLを生成する", () => {
    const xml = renderUrlSetXml([
      {
        loc: "https://example.com/post/hello",
        lastmod: "2025-01-01T00:00:00.000Z",
        changefreq: "daily",
        priority: 0.9,
      },
    ]);

    expect(xml).toContain("<urlset");
    expect(xml).toContain("<loc>https://example.com/post/hello</loc>");
    expect(xml).toContain("<lastmod>2025-01-01T00:00:00.000Z</lastmod>");
    expect(xml).toContain("<changefreq>daily</changefreq>");
    expect(xml).toContain("<priority>0.9</priority>");
  });
});
