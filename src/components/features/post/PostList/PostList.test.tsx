import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { IPostItem } from "@/types/domain/Post";

import { PostList } from "./PostList";

describe("PostList", () => {
  test("正常にレンダリングされること", () => {
    const mockPosts: IPostItem[] = [];
    const { container } = render(<PostList posts={mockPosts} />);
    expect(container).toBeTruthy();
  });

  test("投稿がない場合、空のリストが表示されること", () => {
    const mockPosts: IPostItem[] = [];
    const { container } = render(<PostList posts={mockPosts} />);

    const postList = container.querySelector('[data-testid="post-list"]');
    expect(postList).toBeTruthy();

    const listItems = postList?.querySelectorAll("li");
    expect(listItems).toHaveLength(0);
  });

  test("投稿がある場合、モックの数だけ表示されること", () => {
    const mockPosts: IPostItem[] = [
      {
        slug: "post-1",
        title: "Post 1",
        publishedAt: "2023-01-01",
        tags: [{ name: "tag1", slug: "tag1" }],
      },
      {
        slug: "post-2",
        title: "Post 2",
        publishedAt: "2023-01-02",
        tags: [{ name: "tag2", slug: "tag2" }],
      },
    ];
    const { container } = render(<PostList posts={mockPosts} />);
    const postList = container.querySelector('[data-testid="post-list"]');
    expect(postList).toBeTruthy();

    // postList の直下に li が2件あることを確認
    const listItems = postList?.children;
    expect(listItems).toHaveLength(2);
  });
});
