// eslint-disable-line import/order
import MarkdownIt from "markdown-it"; // eslint-disable-line import/order
import { ParsedUrlQuery } from 'querystring' // eslint-disable-line import/order
import React from "react";

import MyHead from "../../../components/Head/Head";
import { Base } from '../../../components/layouts/Base/index';
import { DetailPage } from "../../../components/templates/Detail";
import { getByContentId, getBySlug, getPostSlugs } from "../../../libs/microcms";
import { PostMapper } from "../../../models/mapper/PostMapper";
import { isProduction } from "../../../utilities/env";

import type { PostProps } from "../../../components/templates/Detail/type";
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';


interface Params extends ParsedUrlQuery {
  slug: string
}

/**
 * 指定文字列から改行・HTMLタグを除いた上で指定文字列抜粋する
 *
 * @param body 指定文字列
 * @param excerptNuNum 抜き出す文字数
 * @returns
 */
const createExcerptFromBody = (body: string, excerptNuNum: number): string => {
  return body
    .replace(/\r?\n/g, "")
    .replace(/<("[^"]*"|'[^']*'|[^'">]|\r?\n)*>/g, '')
    .slice(0, excerptNuNum - 1)
}

const Detail: NextPage<PostProps> = ({ post, draftKey }) => {
  const pagePath = `/post/${post.slug}`

  // description周りで使うため、本文から指定文字抜き出す
  const excerpt = createExcerptFromBody(post.body, 100)

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
      <DetailPage post={post} path={pagePath} draftKey={draftKey} />
    </Base >
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const postPerPage = isProduction ? 100 : 10

  let pageNum = 1
  const paths: any[] = []
  const res = await getPostSlugs(postPerPage, pageNum)

  let maxPage = 0
  if (res.totalCount) {
    maxPage = Math.ceil(res.totalCount / postPerPage)
  }

  if (!res.contents.length) {
    return {
      paths: [{ params: { slug: '' } }],
      fallback: 'blocking'
    }
  }

  res.contents.forEach(({ slug }) => {
    paths.push({ params: { slug } })
  })

  // 全ページ分取得して結合する
  if (isProduction) {
    while (pageNum <= maxPage) {
      const res = await getPostSlugs(postPerPage, paths.length + 1)
      res.contents.forEach(({ slug }) => {
        paths.push({ params: { slug } })
      })

      ++pageNum
      // TODO sleep入れたほうがいいかも
    }
  }

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async ({ params, previewData }) => {
  const slug = await params?.slug
  if (!slug) {
    return {
      notFound: true
    }
  }

  const isDraft = (item: any): item is { draftKey: string } =>
    !!(item?.draftKey && typeof item.draftKey === "string");
  const draftKey = isDraft(previewData) ? { draftKey: previewData.draftKey } : {};

  let res
  if (draftKey && draftKey.draftKey) {
    res = await getByContentId(slug, draftKey.draftKey)
  } else {
    res = await getBySlug(slug)
  }

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

  if (draftKey.draftKey) {
    return { props: { post, ...draftKey } } // 下書きデータはキャッシュさせない
  }
  return { props: { post }, revalidate: isProduction ? 60 : 10 }
}

export default Detail

