import { render, screen } from "@testing-library/react";

import { SITE } from "@/constants/site";

import { Breadcrumb } from "./Breadcrumb";
import type { BreadcrumbItem } from "./type";

const getJsonLd = (container: HTMLElement) => {
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).toBeTruthy();

  return JSON.parse(script?.textContent ?? "");
};

describe("Breadcrumbのレンダリングテスト", () => {
  it("単一アイテムのパンくずリストが正しくレンダリングされる", () => {
    const items: BreadcrumbItem[] = [{ label: "ホーム", href: "/" }];

    const { container } = render(<Breadcrumb items={items} />);

    const nav = screen.getByRole("navigation", { name: "パンくずリスト" });
    expect(nav).toBeTruthy();

    const homeText = screen.getByText("ホーム");
    expect(homeText).toBeTruthy();
    expect(homeText.tagName).toBe("SPAN");

    const jsonLd = getJsonLd(container);
    expect(jsonLd.itemListElement).toHaveLength(1);
    expect(jsonLd.itemListElement[0]).toMatchObject({
      "@type": "ListItem",
      position: 1,
      name: "ホーム",
      item: `${SITE.url}/`,
    });
  });

  it("複数アイテムのパンくずリストが正しくレンダリングされる", () => {
    const items: BreadcrumbItem[] = [
      { label: "ホーム", href: "/" },
      { label: "ブログ", href: "/blog" },
      { label: "記事タイトル", href: "/blog/article" },
    ];

    const { container } = render(<Breadcrumb items={items} />);

    const homeLink = screen.getByRole("link", { name: "ホーム" });
    expect(homeLink).toBeTruthy();
    expect(homeLink.getAttribute("href")).toBe("/");

    const blogLink = screen.getByRole("link", { name: "ブログ" });
    expect(blogLink).toBeTruthy();
    expect(blogLink.getAttribute("href")).toBe("/blog");

    const currentPage = screen.getByText("記事タイトル");
    expect(currentPage).toBeTruthy();
    expect(currentPage.tagName).toBe("SPAN");

    const jsonLd = getJsonLd(container);
    expect(jsonLd.itemListElement).toHaveLength(3);
    expect(jsonLd.itemListElement[2]).toMatchObject({
      "@type": "ListItem",
      position: 3,
      name: "記事タイトル",
      item: `${SITE.url}/blog/article`,
    });
  });

  it("区切り文字が正しく表示される", () => {
    const items: BreadcrumbItem[] = [
      { label: "ホーム", href: "/" },
      { label: "ブログ", href: "/blog" },
      { label: "記事タイトル", href: "/blog/article" },
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
    const items: BreadcrumbItem[] = [{ label: "テスト", href: "/test" }];
    const customClass = "custom-breadcrumb";

    const { container } = render(<Breadcrumb items={items} className={customClass} />);

    const nav = container.querySelector("nav");
    expect(nav?.className).toContain(customClass);
  });
});
