export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export type PageProps<P = {}> = {
  params: Promise<P>;
  searchParams?: SearchParams;
};
