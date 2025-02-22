import type { Metadata } from "next";

import { PostListPage } from "@/components/page/PostList/PostList";
import { calcMaxPage, calcOffset } from "@/components/ui/Pager/util";
import { ROUTE } from "@/constants/route";
import { SITE } from "@/constants/site";
import { getAllPost, POST_PER_PAGE } from "@/libs/microcms";
import { PostMapper } from "@/models/mapper/PostMapper";

const title = `記事一覧 | ${SITE.name}`;
const description = "今までに書いた記事の一覧ページです";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    url: `${SITE.url}/${ROUTE.postList(1)}`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE.url}/${ROUTE.postList(1)}`,
  }
}

const fetchData = async (pageOffset: string) => {
  const pageNum = parseInt(pageOffset, 10);
  const offset = calcOffset(pageNum, POST_PER_PAGE);

  const response = await getAllPost(POST_PER_PAGE, offset);
  const posts = PostMapper.list(response.contents);

  const maxPage = calcMaxPage(response.totalCount, POST_PER_PAGE);

  return {
    posts,
    maxPage,
    pageNum,
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ offset: string }>
}) {
  const offset = (await params).offset

  const props = await fetchData(offset);

  return PostListPage(props);
}
