import { render } from '@testing-library/react'

import { GlobalNav } from "./GlobalNav";

describe("グローバルナビ", () => {
  it("ラベル表示", () => {
    const { getByText } = render(<GlobalNav />);

    expect(getByText("About")).toBeTruthy();
    expect(getByText("タグ一覧")).toBeTruthy();
  });
});
