import type { IPost } from "@/types/domain/Post";

export type SeoProps = Pick<IPost, 'title'|'slug'|'publishedAt'|'thumbnail'>
