import { ParsedUrlQuery } from 'node:querystring' // eslint-disable-line import/order

import MyHead from "../../../components/Head/Head";
import { List } from "../../../components/layouts/List/List";
import { ListPage } from "../../../components/templates/ListPage";
import { getAllPost } from "../../../libs/microcms";
import { PostMapper } from "../../../mapper/PostMapper";
import { IPostItem } from "../../../types/domain/Post";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";



export type ListPageProp = {
  posts: IPostItem[],
  maxPage: number,
  pageNum: number
}

interface Params extends ParsedUrlQuery {
  offset: string
}

const Index: NextPage<ListPageProp> = ({ posts, maxPage, pageNum }) => (
  <List head={
    <MyHead
      title="記事一覧"
      description="今までに書いた記事の一覧ページです"
      url={`/post/page/${pageNum}`}
      pageType='website'
      index='followOnly'
    />
  }>
    <ListPage
      posts={posts}
      maxPage={maxPage}
      pageNum={pageNum}
    />
  </List>
)

const postPerPage = 12;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = []
  try {
    const offset = 0;
    const limit = 1;// 1件でも取ればtotalCountが返ってくるので1件だけ取得する
    const res = await getAllPost(limit, offset)

    const maxPage = Math.ceil(res.totalCount / postPerPage)

    let pageNum = 1;
    do {
      paths.push({ params: { offset: pageNum.toString() } })
      ++pageNum
    } while (pageNum < maxPage);

  } catch (error) {
    console.error(error);
    return {
      paths: [{ params: { offset: '1' } }],
      fallback: false
    }
  }

  return {
    paths: paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<ListPageProp, Params> = async (context) => {
  const offsetParam = await context.params?.offset
  if (!offsetParam) {
    return {
      notFound: true
    }
  }
  const pageNum = parseInt(offsetParam);

  let offset = 0;
  if (pageNum > 1) {
    offset = postPerPage * pageNum + 1
  }

  const response = await getAllPost(postPerPage, offset)
  const posts = await PostMapper.list(response.contents);

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
