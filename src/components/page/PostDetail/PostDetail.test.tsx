import { render, screen } from "@testing-library/react";

import type { IPost, IPostItem } from "@/types/domain/Post";

import { PostDetailPage } from "./PostDetail";

const mockPost: IPost = {
  id: "post-1",
  slug: "sample-post",
  title: "Sample Post",
  body: `
    <p>First paragraph</p>
    <h2>Section title</h2>
    <h3>Subsection title</h3>
    <pre><code>const value = 1;</code></pre>
    <ul><li>List item</li></ul>
  `,
  category: {
    name: "Category",
    slug: "category",
  },
  tags: [
    {
      name: "tag1",
      slug: "tag1",
    },
  ],
  thumbnail: null,
  publishedAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-02T00:00:00.000Z",
};

describe("PostDetailPage", () => {
  test("記事本文に可読性向けのレイアウトクラスが適用されること", () => {
    render(<PostDetailPage post={mockPost} relatedPosts={[]} />);

    const headerWrap = screen.getByTestId("post-header-wrap");
    expect(headerWrap.className).toContain("tw:max-w-[48rem]");
    expect(headerWrap.className).toContain("tw:mx-auto");

    const bodyWrap = screen.getByTestId("post-body-wrap");
    expect(bodyWrap.className).toContain("tw:max-w-[48rem]");
    expect(bodyWrap.className).toContain("tw:mx-auto");

    const body = screen.getByTestId("post-body");
    expect(body.className).toContain("tw:max-w-none");
    expect(body.className).toContain("tw:prose-p:leading-[1.9]");
    expect(body.className).toContain("tw:prose-p:my-[1.4em]");
    expect(body.className).toContain("tw:prose-h2:mt-16");
    expect(body.className).toContain("tw:prose-h3:mt-10");
    expect(body.className).toContain("tw:prose-pre:my-8");
  });

  test("主要な記事要素が表示されること", () => {
    const relatedPosts: IPostItem[] = [
      {
        slug: "related-post",
        title: "Related Post",
        publishedAt: "2024-01-03",
        tags: [
          {
            name: "tag2",
            slug: "tag2",
          },
        ],
      },
    ];

    render(<PostDetailPage post={mockPost} relatedPosts={relatedPosts} />);

    expect(screen.getByRole("heading", { name: "Sample Post", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("First paragraph")).toBeInTheDocument();
    expect(screen.getByText("Section title")).toBeInTheDocument();
    expect(screen.getByText("Subsection title")).toBeInTheDocument();
    expect(screen.getByText("List item")).toBeInTheDocument();
    expect(screen.getByText("Related Post")).toBeInTheDocument();
  });
});
