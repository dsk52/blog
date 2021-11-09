import { ParsedUrlQuery } from 'node:querystring'
import React from "react";

import { ButtonLink } from "../../components/Button/Button";
import MyHead from "../../components/Head/Head";
import { Article, ArticleBody, ArticleFooter, ArticleHeader } from "../../components/layouts/ArticleBody/Article";
import Page from "../../components/layouts/Page/Page";
import detailStyle from '../../components/ui/PostItem/PostItem.module.css'
import { getAllPost, getBySlug } from "../../libs/microcms";
import { PostMapper } from "../../mapper/PostMapper";
import { datetimeToDate } from "../../utilities/Date";

import type { IPost } from '../../types/domain/Post';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';


type PostPops = {
  post: IPost
}

interface Params extends ParsedUrlQuery {
  slug: string
}

const Detail: NextPage<PostPops> = ({ post }) => {
  const pubDate = datetimeToDate(post.publishedAt)

  return (
    <Page head={
      <MyHead
        title={post.title}
        description=""
        url="/post/"
      />
    }>
      <Article>
        <ArticleHeader>
          <h1>{post.title}</h1>
          <div className={detailStyle.meta}>
            <div className={detailStyle.category}>{post.category.name}</div>
            <time className={detailStyle.date}>{pubDate}</time>
          </div>
        </ArticleHeader>

        <ArticleBody>
          {post.body}
        </ArticleBody>

        <ArticleFooter>
          <ButtonLink link='/post'>
            トップに戻る
          </ButtonLink>
        </ArticleFooter>
      </Article>
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
  if (!res.contents || !res.contents.length) {
    return {
      notFound: true
    }
  }

  const post = await PostMapper.detail(res.contents[0])

  return { props: { post } }
}

export default Detail
