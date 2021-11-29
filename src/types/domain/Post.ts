export interface IPost {
  id: string;
  slug: string;
  title: string;
  body: string;
  category: ICategory;
  tags: ITag[];
  publishedAt: string;
  updatedAt: string;
}

export interface IPostItem {
  slug: string;
  title: string;
  tags: ITag[];
  publishedAt: string;
}

export interface ICategory {
  name: string;
  slug: string;
}

export interface ITag {
  name: string;
  slug: string;
}
