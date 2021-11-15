import hljs from 'highlight.js'; // eslint-disable-line import/order
import MarkdownIt from "markdown-it"; // eslint-disable-line import/order
import { ParsedUrlQuery } from 'node:querystring' // eslint-disable-line import/order

import { ButtonLink } from "../../components/Button/Button";
import MyHead from "../../components/Head/Head";
import { Article, ArticleBody, ArticleFooter, ArticleHeader } from "../../components/layouts/ArticleBody/Article";
import Page from "../../components/layouts/Page/Page";
import detailStyle from '../../components/ui/PostItem/PostItem.module.css'
import { TagList } from "../../components/ui/TagList/TagList";
import { getAllPost, getBySlug } from "../../libs/microcms";
import { PostMapper } from "../../mapper/PostMapper";
import { datetimeToDate } from "../../utilities/Date";

import type { IPost, IPostItem } from '../../types/domain/Post';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import 'highlight.js/styles/github.css';

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
        pageType="article"
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

  const paths = posts.map((post: IPostItem) => ({ params: { slug: post.slug } }))

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

  const md: MarkdownIt = new MarkdownIt({
    html: true,
    breaks: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>';
        } catch (__) { }
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  })
  post.body = md.render(post.body)

  return { props: { post } }
}

export default Detail

