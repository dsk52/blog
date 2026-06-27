import { cleanup, render } from "@testing-library/react";

import { Pager } from "./Pager";
import { calcMaxPage, calcOffset, parsePageNum } from "./util";

const POST_PER_PAGE = 12;

describe("Offsetのテスト", () => {
  it("0ページ目が0になる", () => {
    const offset = calcOffset(0, POST_PER_PAGE);
    expect(offset).toBe(0);
  });

  it("1ページ目がPER_PAGEになる", () => {
    const offset = calcOffset(1, POST_PER_PAGE);
    expect(offset).toBe(0);
  });

  it("2ページ目がPER_PAGEの倍数になる", () => {
    const offset = calcOffset(2, POST_PER_PAGE);
    expect(offset).toBe(POST_PER_PAGE);
  });
});

describe("MaxPageのテスト", () => {
  it("PER_PAGE未満のときに1ページになる", () => {
    const maxPage = calcMaxPage(10, POST_PER_PAGE);
    expect(maxPage).toBe(1);
  });

  it("PER_PAGEを少し超えるときに2ページになる", () => {
    const maxPage = calcMaxPage(13, POST_PER_PAGE);
    expect(maxPage).toBe(2);
  });
});

describe("ページ番号パースのテスト", () => {
  it("1以上の整数をページ番号として返す", () => {
    expect(parsePageNum("1")).toBe(1);
    expect(parsePageNum("2")).toBe(2);
  });

  it("1未満のページ番号は不正値にする", () => {
    expect(parsePageNum("0")).toBeUndefined();
    expect(parsePageNum("-1")).toBeUndefined();
  });

  it("整数ではないページ番号は不正値にする", () => {
    expect(parsePageNum("abc")).toBeUndefined();
    expect(parsePageNum("1abc")).toBeUndefined();
    expect(parsePageNum("1.5")).toBeUndefined();
  });
});

afterEach(cleanup);

describe("ページャーの表示", () => {
  it("1/1の時、表示されないこと", async () => {
    const { queryByTestId } = render(<Pager basePath="" pageNum={1} maxPage={1} />);

    expect(queryByTestId("prev")).toBeFalsy();
    expect(queryByTestId("next")).toBeFalsy();
  });

  it("2/2の時、前のページへが表示される", async () => {
    const { findByTestId, queryByTestId } = render(<Pager basePath="" pageNum={2} maxPage={2} />);

    expect(findByTestId("prev")).toBeTruthy();
    expect(queryByTestId("next")).toBeFalsy();
  });

  it("1/2の時、次のページへが表示される", async () => {
    const { findByTestId, queryByTestId } = render(<Pager basePath="" pageNum={1} maxPage={2} />);

    expect(findByTestId("next")).toBeTruthy();
    expect(queryByTestId("prev")).toBeFalsy();
  });

  it("最大ページを超えている時、次のページへが表示されない", () => {
    const { queryByTestId } = render(<Pager basePath="" pageNum={3} maxPage={2} />);

    expect(queryByTestId("next")).toBeFalsy();
  });
});
