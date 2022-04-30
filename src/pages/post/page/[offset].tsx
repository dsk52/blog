import { ParsedUrlQuery } from 'querystring' // eslint-disable-line import/order

import MyHead from "../../../components/Head/Head";
import { Base } from '../../../components/layouts/Base/index';
import { ListPage } from '../../../components/templates/List/index';
import { getAllPost } from "../../../libs/microcms";
import { PostMapper } from "../../../models/mapper/PostMapper";

import type { IPostItem } from "../../../types/domain/Post";
import type { GetServerSideProps, NextPage } from "next";



export type ListPageProp = {
  posts: IPostItem[],
  maxPage: number,
  pageNum: number
}

interface Params extends ParsedUrlQuery {
  offset: string
}

const Index: NextPage<ListPageProp> = ({ posts, maxPage, pageNum }) => (
  <Base head={
    <MyHead
      title="記事一覧"
      description="今までに書いた記事の一覧ページです"
      url={`/post/page/${pageNum}`}
      pageType='website'
      index='index'
    />
  }>
    <ListPage
      posts={posts}
      maxPage={maxPage}
      pageNum={pageNum}
    />
  </Base>
)

const postPerPage = 12;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const offsetParams = context.params?.offset
  if (!offsetParams) {
    return {
      notFound: true
    }
  }
  const pageNum = parseInt(offsetParams[0]);

  const offset = pageNum > 1 ? postPerPage * pageNum + 1 : 0;

  const response = await getAllPost(postPerPage, offset)
  const posts = PostMapper.list(response.contents);

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
