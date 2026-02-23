import { describe, expect, it } from "vitest";

import { splitSitemapEntries } from "./split";

describe("splitSitemapEntries", () => {
  it("0件でも1チャンクを返す", () => {
    const chunks = splitSitemapEntries([]);
    expect(chunks).toEqual([[]]);
  });

  it("5000件以下は1チャンク", () => {
    const entries = Array.from({ length: 5000 }, (_value, index) => ({
      loc: `https://example.com/post/${index}`,
    }));

    const chunks = splitSitemapEntries(entries, 5000);
    expect(chunks).toHaveLength(1);
    expect(chunks[0]).toHaveLength(5000);
  });

  it("5001件は2チャンク", () => {
    const entries = Array.from({ length: 5001 }, (_value, index) => ({
      loc: `https://example.com/post/${index}`,
    }));

    const chunks = splitSitemapEntries(entries, 5000);
    expect(chunks).toHaveLength(2);
    expect(chunks[0]).toHaveLength(5000);
    expect(chunks[1]).toHaveLength(1);
  });
});
