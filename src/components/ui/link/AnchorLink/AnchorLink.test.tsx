import { render, screen } from "@testing-library/react";

import { SITE } from "@/constants/site";

import { AnchorLink } from "./AnchorLink";

describe("AnchorLinkのレンダリングテスト", () => {
  it("#なリンクがレンダリングできる", async () => {
    render(<AnchorLink>リンク</AnchorLink>);

    const element = screen.getByRole("link");

    expect(element).toBeTruthy();
    expect(element.getAttribute("href")).toBe("#");
    expect(element.getAttribute("target")).toBe("_self");
    expect(element.getAttribute("rel")).toBeNull();
  });

  it("通常のリンクがレンダリングできる", async () => {
    const link = SITE.url;
    render(<AnchorLink href={link}>リンク</AnchorLink>);

    const element = screen.getByRole("link");

    expect(element.getAttribute("href")).toBe(link);
  });

  it("外部リンクがレンダリングできる", async () => {
    const link = SITE.url;
    render(
      <AnchorLink href={link} target="_blank">
        リンク
      </AnchorLink>,
    );

    const element = screen.getByRole("link");

    expect(element.getAttribute("target")).toBe("_blank");
    expect(element.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
