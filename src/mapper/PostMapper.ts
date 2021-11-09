import type { ApiPost, ApiTag } from "../types/api/Post";
import type { ICategory, IPost, ITag } from "../types/domain/Post";

export class PostMapper {
  public static category(category: any): ICategory {
    if (!category) {
      return {
        name: "",
        slug: "",
      };
    }

    return {
      name: category.name || "",
      slug: category.slug || "",
    };
  }

  public static tags(tags: ApiTag[]): ITag[] {
    if (!tags) {
      return [];
    }

    return tags.map((tag: ApiTag) => {
      return {
        name: tag.name || "",
        slug: tag.slug || "",
      };
    });
  }

  public static detail(post: ApiPost): IPost {
    const category = this.category(post?.category);
    const tags = this.tags(post?.tags);

    return {
      id: post.id,
      title: post.title,
      body: post.body,
      slug: post.slug,
      category: category,
      tags: tags,
      updatedAt: post.updatedAt,
      publishedAt: post.publishedAt,
    };
  }

  public static list(posts: ApiPost[]): IPost[] {
    return posts.map((post: ApiPost) => this.detail(post));
  }
}
