import type { ApiCategory, ApiPost } from "../types/api/Post";
import type { ICategory, IPost, ITag } from "../types/domain/Post";

export class PostMapper {
  public static post(post: ApiPost): IPost {
    const category: ICategory = {
      name: post.category.name,
      slug: post.category.slug,
    };

    const tags: ITag[] = post.tags.map((cate: ApiCategory) => {
      return {
        name: cate.name,
        slug: cate.slug,
      };
    });

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
    return posts.map((post: ApiPost) => this.post(post));
  }
}
