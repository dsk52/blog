// eslint-disable-line import/order
import MarkdownIt from "markdown-it"; // eslint-disable-line import/order
import { ParsedUrlQuery } from 'node:querystring' // eslint-disable-line import/order
import MyHead from "../../components/Head/Head";
import { Article, ArticleBody, ArticleFooter, ArticleHeader } from "../../components/layouts/Article/Article";
import Page from "../../components/layouts/Page/Page";
import { ButtonLink } from "../../components/ui/Button/Button";
import detailStyle from '../../components/ui/PostItem/PostItem.module.css'
import { Share } from "../../components/ui/Share/Share";
import { TagList } from "../../components/ui/TagList/TagList";
import { getBySlug, getPostSlugs } from "../../libs/microcms";
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
  const pagePath = `/post/${post.slug}`

  return (
    <Page head={
      <MyHead
        title={post.title}
        description=""
        url={pagePath}
        pageType="article"
        index='index'
      />
    }>
      <Article>
        <ArticleHeader>
          <h1>{post.title}</h1>
          <div className={detailStyle.meta}>
            <time
              className={detailStyle.date}
              dateTime={post.publishedAt}
            >
              {pubDate}
            </time>
            <div className={detailStyle.category}>{post.category.name}</div>
          </div>
        </ArticleHeader>

        <ArticleBody>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </ArticleBody>

        <ArticleFooter>
          <aside>
            <TagList tags={post.tags} />
          </aside>

          <section>
            <h2>Share</h2>
            <Share title={post.title} path={pagePath} />
          </section>

          <ButtonLink link='/' label="トップに戻る" />
        </ArticleFooter>
      </Article>
    </Page>
  )
}

const isProduction = process.env.NODE_ENV === 'production'

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
      fallback: isProduction ? false : 'blocking'
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
    fallback: isProduction ? false : 'blocking'
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

  const md: MarkdownIt = new MarkdownIt({
    html: true,
    breaks: true,
    typographer: true
  })
  post.body = md.render(post.body)

  return { props: { post } }
}

export default Detail

