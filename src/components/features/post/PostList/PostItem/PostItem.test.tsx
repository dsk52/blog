import { render, screen } from "@testing-library/react";

import type { IPostItem } from "@/types/domain/Post";

import { PostItem } from "./PostItem";

// Mock dependencies
vi.mock("@/components/ui/link/AnchorLink/AnchorLink", () => ({
  AnchorLink: ({ children, href, className }: any) => (
    <a href={href} className={className} data-testid="anchor-link">
      {children}
    </a>
  ),
}));

vi.mock("@/components/ui/TagList/TagList", () => ({
  TagList: ({ tags }: IPostItem) => (
    <div data-testid="tag-list">
      {tags.map((tag: IPostItem["tags"][number]) => (
        <span key={tag.slug} data-tag={tag.name}>
          {tag.name}
        </span>
      ))}
    </div>
  ),
}));

vi.mock("@/utilities/Date", () => ({
  datetimeToDate: (date: string) => "2023-01-01",
}));

describe("PostItem", () => {
  const mockPost = {
    title: "Test Post Title",
    slug: "test-post",
    publishedAt: "2023-01-01T00:00:00Z",
    tags: [
      {
        name: "tag1",
        slug: "tag1",
      },
      {
        name: "tag2",
        slug: "tag2",
      },
    ],
  } satisfies IPostItem;

  it("タイトルが取得できること", () => {
    const { getByText } = render(<PostItem post={mockPost} />);
    expect(getByText("Test Post Title")).toBeInTheDocument();
  });

  it("フォーマットされた公開日が表示されること", () => {
    const { getByText } = render(<PostItem post={mockPost} />);
    expect(getByText("2023-01-01")).toBeInTheDocument();
  });

  it("投稿のスラッグを含む正しいリンクが含まれること", () => {
    const { getByTestId } = render(<PostItem post={mockPost} />);
    const link = getByTestId("anchor-link");

    expect(link).toHaveAttribute("href", expect.stringContaining("test-post"));
  });

  it("投稿のタグを含むタグリストが表示されること", () => {
    const { getByText, getByTestId } = render(<PostItem post={mockPost} />);
    const tagList = getByTestId("tag-list");

    expect(tagList).toBeInTheDocument();
    expect(getByText("tag1")).toBeInTheDocument();
    expect(getByText("tag2")).toBeInTheDocument();
  });

  it("コンテナとしてarticle要素が表示されること", () => {
    const { container } = render(<PostItem post={mockPost} />);
    expect(container.querySelector("article")).toBeInTheDocument();
  });
});
