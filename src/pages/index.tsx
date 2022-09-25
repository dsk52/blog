import MyHead from "../components/Head/Head";
import { Base } from "../components/layouts/Base";
import { ListPage } from "../components/templates/List";
import { calcMaxPage } from '../components/ui/Pager/Pager';
import { ROUTE } from '../constants/route';
import { getAllPost, postPerPage } from "../libs/microcms";
import { PostMapper } from "../models/mapper/PostMapper";

import type { ListPageProp } from "./post/page/[offset]";
import type { GetServerSideProps, NextPage } from "next";


const Index: NextPage<ListPageProp> = ({ posts, maxPage, pageNum }) => (
  <Base head={
    <MyHead
      title=""
      description=""
      url={ROUTE.top}
      pageType="website"
      index='index'
    />
  }>
    <ListPage
      posts={posts}
      basePath={ROUTE.postListBase}
      maxPage={maxPage}
      pageNum={pageNum}
    />
  </Base>
);

export const getServerSideProps: GetServerSideProps = async (_) => {
  const response = await getAllPost()
  const posts = PostMapper.list(response.contents);

  const pageNum = 1;  // トップなので、1ページ目を確定
  const maxPage = calcMaxPage(response.totalCount, postPerPage)

  return {
    props: {
      posts,
      maxPage,
      pageNum
    }
  }
}

export default Index;
