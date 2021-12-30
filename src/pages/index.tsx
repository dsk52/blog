import { Params } from "next/dist/server/router";

import MyHead from "../components/Head/Head";
import { Base } from "../components/layouts/Base";
import { ListPage } from "../components/templates/List";
import { getAllPost } from "../libs/microcms";
import { PostMapper } from "../models/mapper/PostMapper";

import type { ListPageProp } from "./post/page/[offset]";
import type { GetStaticProps, NextPage } from "next";


const Index: NextPage<ListPageProp> = ({ posts, maxPage, pageNum }) => (
  <Base head={
    <MyHead
      title=""
      description=""
      url="/"
      pageType="website"
      index='index'
    />
  }>
    <ListPage
      posts={posts}
      maxPage={maxPage}
      pageNum={pageNum}
    />
  </Base>
);

export const getStaticProps: GetStaticProps<ListPageProp, Params> = async () => {
  const response = await getAllPost()
  const posts = await PostMapper.list(response.contents);

  const postPerPage = 12;

  const pageNum = 1;  // トップなので、1ページ目を確定
  const maxPage = Math.ceil(response.totalCount / postPerPage)

  return {
    props: {
      posts,
      maxPage,
      pageNum
    }
  }
}

export default Index;
