export type IndexType = "index" | "noindex" | "";

export type Props = {
  title: string;
  description: string;
  url: string;
  image?: string;
  pageType: "website" | "article";
  index: IndexType;
};
