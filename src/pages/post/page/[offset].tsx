import MyHead from "../../../components/Head/Head";
import { Base } from '../../../components/layouts/Base/index';
import { ListPage } from '../../../components/templates/List/index';
import { calcOffset, calcMaxPage } from "../../../components/ui/Pager/Pager";
import { getAllPost, postPerPage } from "../../../libs/microcms";
import { PostMapper } from "../../../models/mapper/PostMapper";

import type { IPostItem } from "../../../types/domain/Post";
import type { GetServerSideProps, NextPage } from "next";



export type ListPageProp = {
  posts: IPostItem[],
  maxPage: number,
  pageNum: number
}

const Index: NextPage<ListPageProp> = ({ posts, maxPage, pageNum }) => {
  const basePath = "/post/page"

  return (
    <Base head={
      <MyHead
        title="記事一覧"
        description="今までに書いた記事の一覧ページです"
        url={`${basePath}${pageNum}`}
        canonicalUrl={`${basePath}/1`}
        pageType='website'
        index='index'
      />
    }>
      <ListPage
        posts={posts}
        basePath={basePath}
        maxPage={maxPage}
        pageNum={pageNum}
      />
    </Base>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const offsetParams = context.params?.offset
  if (!offsetParams) {
    return {
      notFound: true
    }
  }
  const pageNum = parseInt(offsetParams[0]);

  const offset = calcOffset(pageNum, postPerPage)

  const response = await getAllPost(postPerPage, offset)
  const posts = PostMapper.list(response.contents);

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
