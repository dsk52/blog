import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { PostBody } from "./PostBody";

const setClipboard = (writeText: (text: string) => Promise<void>) => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
};

describe("PostBody", () => {
  test("コードブロックごとにコピーボタンを表示すること", () => {
    setClipboard(vi.fn());

    render(
      <PostBody
        body={`
          <p>本文</p>
          <pre><code>const first = 1;</code></pre>
          <pre><code>const second = 2;</code></pre>
        `}
      />
    );

    expect(screen.getAllByRole("button", { name: "コードをコピー" })).toHaveLength(2);
  });

  test("選択したコードブロックのテキストをコピーすること", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);

    render(
      <PostBody
        body={`
          <pre><code><span class="token keyword">const</span> first = 1;</code></pre>
          <pre><code><span class="token keyword">const</span> second = 2;</code></pre>
        `}
      />
    );

    fireEvent.click(screen.getAllByRole("button", { name: "コードをコピー" })[1]);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("const second = 2;");
    });
    expect(screen.getAllByRole("button", { name: "コードをコピー" })[1]).toHaveTextContent(
      "コピーしました"
    );
  });

  test("コピーに失敗した場合はエラーを表示すること", async () => {
    setClipboard(vi.fn().mockRejectedValue(new Error("Clipboard API error")));

    render(<PostBody body="<pre><code>const value = 1;</code></pre>" />);

    const button = screen.getByRole("button", { name: "コードをコピー" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveTextContent("コピーできませんでした");
    });
  });

  test("コードブロックがない場合はコピーボタンを表示しないこと", () => {
    setClipboard(vi.fn());

    render(<PostBody body="<p>本文のみ</p><code>inlineCode</code>" />);

    expect(screen.queryByRole("button", { name: "コードをコピー" })).not.toBeInTheDocument();
  });
});
