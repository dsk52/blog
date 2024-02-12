import { render } from "@testing-library/react";

import { ROUTE } from "@/constants/route";

import { Tag } from "./Tag";

import type { TagProps } from "./type";

describe("Tagのレンダリングテスト", () => {
  const commonProps = {
    name: "見出し",
    slug: "slug",
  } as const satisfies Partial<TagProps>;

  it("リンクしたタグとしてレンダリングできる", async () => {
    const res = render(<Tag {...commonProps} doLink />);

    const element = res.getByRole("link");
    expect(element).toBeTruthy();
    expect(element.getAttribute("href")).toBe(
      ROUTE.postTagList(commonProps.slug, 1),
    );
  });

  it("非リンクなタグとしてレンダリングできる", async () => {
    const res = render(<Tag {...commonProps} />);

    const element = res.getByTestId("nonLinkTag");
    expect(element).toBeTruthy();
    expect(element.nodeName).toBe("SPAN"); // HACK spanタグを上手く特定するのが難しいのでこの取り方

    expect(element.getAttribute("href")).toBeNull();
  });
});
