// eslint-disable-line import/order
import MarkdownIt from "markdown-it"; // eslint-disable-line import/order
import { ParsedUrlQuery } from 'node:querystring' // eslint-disable-line import/order
import React from "react";

import MyHead from "../../components/Head/Head";
import { Base } from '../../components/layouts/Base/index';
import { DetailPage } from "../../components/templates/Detail";
import { getBySlug, getPostSlugs } from "../../libs/microcms";
import { PostMapper } from "../../models/mapper/PostMapper";
import { isProduction } from "../../utilities/env";

import type { IPost } from '../../types/domain/Post';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';


export type PostProps = {
  post: IPost
}

interface Params extends ParsedUrlQuery {
  slug: string
}

const Detail: NextPage<PostProps> = ({ post }) => {
  const pagePath = `/post/${post.slug}`
  const excerpt = post.body.replace(/\r?\n/g, "").replace(/<("[^"]*"|'[^']*'|[^'">]|\r?\n)*>/g, '').slice(0, 99)

  return (
    <Base head={
      <MyHead
        title={post.title}
        description={excerpt}
        url={pagePath}
        pageType="article"
        index='index'
      />
    }>
      <DetailPage post={post} path={pagePath} />
    </Base >
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  let postPerPage = 10
  if (isProduction) {
    postPerPage = 100
  }

  let pageNum = 0
  const paths: any[] = []
  const res = await getPostSlugs(postPerPage, pageNum)

  let maxPage = 0
  if (res.totalCount) {
    maxPage = Math.ceil(res.totalCount / postPerPage)
  }

  if (!res.contents.length) {
    return {
      paths: [{ params: { slug: '' } }],
      fallback: false
    }
  }

  res.contents.forEach(({ slug }) => {
    paths.push({ params: { slug: slug } })
  })
  ++pageNum

  // 全ページ分取得して結合する
  if (isProduction) {
    while (pageNum <= maxPage) {
      const res = await getPostSlugs(postPerPage, paths.length + 1)
      res.contents.forEach(({ slug }) => {
        paths.push({ params: { slug: slug } })
      })

      ++pageNum
      // TODO sleep入れたほうがいいかも
    }
  }

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async (context) => {
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

  const md: MarkdownIt = new MarkdownIt({
    html: true,
    breaks: true,
    typographer: true
  })
  post.body = md.render(post.body)

  return { props: { post } }
}

export default Detail

