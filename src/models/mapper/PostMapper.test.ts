import type { ApiPost } from "@/types/api/Post";

import { PostMapper } from "./PostMapper";

describe("PostMapper.detail()", () => {
  const mockCommonPost = {
    id: "test-id",
    title: "テスト投稿",
    body: "テスト本文",
    slug: "test-slug",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  } satisfies Partial<ApiPost>;

  it("投稿データを正しくマッピングできること", () => {
    const completePostData: ApiPost = {
      ...mockCommonPost,
      category: {
        id: "test-category-id",
        name: "テストカテゴリ",
        slug: "test-category",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
      },
      tags: [
        {
          id: "test-tag-1",
          name: "テストタグ1",
          slug: "test-tag-1",
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:00:00Z",
        },
        {
          id: "test-tag-2",
          name: "テストタグ2",
          slug: "test-tag-2",
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:00:00Z",
        },
      ],
      thumbnail: {
        url: "test-thumbnail.jpg",
        height: 100,
        width: 100,
      },
      publishedAt: "2023-01-01T00:00:00Z",
    };

    const result = PostMapper.detail(completePostData);

    const mappedPost: ReturnType<typeof PostMapper.detail> = {
      id: "test-id",
      title: "テスト投稿",
      body: "テスト本文",
      slug: "test-slug",
      category: {
        name: "テストカテゴリ",
        slug: "test-category",
      },
      tags: [
        {
          name: "テストタグ1",
          slug: "test-tag-1",
        },
        {
          name: "テストタグ2",
          slug: "test-tag-2",
        },
      ],
      thumbnail: {
        url: "test-thumbnail.jpg",
        height: 100,
        width: 100,
      },
      updatedAt: "2023-01-01T00:00:00Z",
      publishedAt: "2023-01-01T00:00:00Z",
    };
    expect(result).toEqual(mappedPost);
  });

  it("オプショナルなフィールドが未設定の場合、デフォルト値が設定されること", () => {
    const minimumPostData: ApiPost = {
      ...mockCommonPost,
      category: {
        id: "default-category",
        name: "",
        slug: "",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
      },
      tags: [],
    };

    const result = PostMapper.detail(minimumPostData);

    expect(result).toEqual({
      id: "test-id",
      title: "テスト投稿",
      body: "テスト本文",
      slug: "test-slug",
      category: {
        name: "",
        slug: "",
      },
      tags: [],
      thumbnail: null,
      updatedAt: "2023-01-01T00:00:00Z",
      publishedAt: "",
    });
  });
});
