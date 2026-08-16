import { describe, expect, test } from "vitest";

import { md } from "./markdown-it";

describe("md", () => {
  test("コードブロックをPrismでハイライトする", () => {
    const html = md.render('```js\nconst message = "hello";\n```');

    expect(html).toContain('<code class="language-js">');
    expect(html).toContain('<span class="token keyword">const</span>');
  });
});
