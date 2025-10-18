import { render, screen } from "@testing-library/react";

import { Breadcrumb } from "./Breadcrumb";
import type { BreadcrumbItem } from "./type";

describe("Breadcrumbのレンダリングテスト", () => {
  it("単一アイテムのパンくずリストが正しくレンダリングされる", () => {
    const items: BreadcrumbItem[] = [{ label: "ホーム" }];

    render(<Breadcrumb items={items} />);

    const nav = screen.getByRole("navigation", { name: "パンくずリスト" });
    expect(nav).toBeTruthy();

    const homeText = screen.getByText("ホーム");
    expect(homeText).toBeTruthy();
    expect(homeText.tagName).toBe("SPAN");
  });

  it("複数アイテムのパンくずリストが正しくレンダリングされる", () => {
    const items: BreadcrumbItem[] = [
      { label: "ホーム", href: "/" },
      { label: "ブログ", href: "/blog" },
      { label: "記事タイトル" },
    ];

    render(<Breadcrumb items={items} />);

    const homeLink = screen.getByRole("link", { name: "ホーム" });
    expect(homeLink).toBeTruthy();
    expect(homeLink.getAttribute("href")).toBe("/");

    const blogLink = screen.getByRole("link", { name: "ブログ" });
    expect(blogLink).toBeTruthy();
    expect(blogLink.getAttribute("href")).toBe("/blog");

    const currentPage = screen.getByText("記事タイトル");
    expect(currentPage).toBeTruthy();
    expect(currentPage.tagName).toBe("SPAN");
  });

  it("区切り文字が正しく表示される", () => {
    const items: BreadcrumbItem[] = [
      { label: "ホーム", href: "/" },
      { label: "ブログ", href: "/blog" },
      { label: "記事タイトル" },
    ];

    const { container } = render(<Breadcrumb items={items} />);

    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBe(2);
    expect(separators[0].textContent).toBe("/");
    expect(separators[1].textContent).toBe("/");
  });

  it("最後のアイテムはリンクにならない", () => {
    const items: BreadcrumbItem[] = [
      { label: "ホーム", href: "/" },
      { label: "現在のページ", href: "/current" },
    ];

    render(<Breadcrumb items={items} />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(1);
    expect(links[0].textContent).toBe("ホーム");

    const currentPage = screen.getByText("現在のページ");
    expect(currentPage.tagName).toBe("SPAN");
  });

  it("カスタムclassNameが適用される", () => {
    const items: BreadcrumbItem[] = [{ label: "テスト" }];
    const customClass = "custom-breadcrumb";

    const { container } = render(<Breadcrumb items={items} className={customClass} />);

    const nav = container.querySelector("nav");
    expect(nav?.className).toContain(customClass);
  });
});
