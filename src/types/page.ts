export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export type PageProps<P = object> = {
  params: Promise<P>;
  searchParams?: SearchParams;
};
