import { ParsedUrlQuery } from 'node:querystring'

import MyHead from "../../components/Head/Head";
import Page from "../../components/layouts/Page/Page";
import { getAllPost, getBySlug } from "../../libs/microcms";
import { PostMapper } from "../../mapper/PostMapper";

import type { IPost } from '../../types/domain/Post';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';


type PostPops = {
  post: IPost
}

interface Params extends ParsedUrlQuery {
  slug: string
}

const Detail: NextPage<PostPops> = ({ post }) => {
  return (
    <Page head={
      <MyHead
        title=""
        description=""
        url="/post/"
      />
    }>
      <>
        {!post ? '' : (<div>{post.title}</div>)}
        詳細
      </>
    </Page>
  )
}

const isPorduction = process.env.NODE_ENV === 'production'

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const response = isPorduction ? await getAllPost(2) : await getAllPost(10)
  // TODO 数100件ずつ取得し、joinする形に変更
  const posts = await PostMapper.list(response.contents)

  const paths = posts.map((post: IPost) => ({ params: { slug: post.slug } }))

  return {
    paths,
    fallback: isPorduction ? false : 'blocking'
  }
}

export const getStaticProps: GetStaticProps<PostPops, Params> = async (context) => {
  const slug = await context.params?.slug
  if (!slug) {
    return {
      notFound: true
    }
  }

  const res = await getBySlug(slug)
  if (!res.contents) {
    return {
      notFound: true
    }
  }

  const post = await PostMapper.detail(res.contents[0])

  return { props: { post } }
}

export default Detail
