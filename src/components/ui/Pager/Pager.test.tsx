import { cleanup, render } from "@testing-library/react";

import { Pager } from "./Pager";
import { calcMaxPage, calcOffset } from "./util";

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
});
