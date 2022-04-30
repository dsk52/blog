import MyHead from "../components/Head/Head";
import { Base } from "../components/layouts/Base";
import { ListPage } from "../components/templates/List";
import { getAllPost } from "../libs/microcms";
import { PostMapper } from "../models/mapper/PostMapper";

import type { ListPageProp } from "./post/page/[offset]";
import type { GetServerSideProps, NextPage } from "next";


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
      basePath='/post/page/'
      maxPage={maxPage}
      pageNum={pageNum}
    />
  </Base>
);

export const getServerSideProps: GetServerSideProps = async (_) => {
  const response = await getAllPost()
  const posts = PostMapper.list(response.contents);

  const postPerPage = 10;

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
