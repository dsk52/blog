import getConfig from "next/config";
import React, { type VFC } from "react";

import { PostProps } from "../../../pages/post/[slug]";
import { datetimeToDate } from "../../../utilities/Date";
import { Adsense } from "../../Adsense/Adsense";
import { Container } from "../../Container";
import { Article, ArticleHeader, ArticleBody, ArticleFooter } from "../../layouts/Article/Article";
import { ButtonLink } from "../../ui/Button/Button";
import ds from '../../ui/PostItem/PostItem.module.css'
import { Share } from "../../ui/Share/Share";
import { TagList } from "../../ui/TagList/TagList";


type DetailProps = {
  path: string
} & PostProps

const { publicRuntimeConfig } = getConfig()

const {
  NEXT_PUBLIC_ADSENSE_CLIENT,
  NEXT_PUBLIC_ADS_ARTICLE_IN_SLOT,
  NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT
} = publicRuntimeConfig

export const DetailPage: VFC<DetailProps> = ({ post, path }) => {
  const pubDate = datetimeToDate(post.publishedAt)

  return (
    <>
      <Article>
        <Container>
          <ArticleHeader>
            <h1>{post.title}</h1>
            <div className={ds.meta}>
              <time
                className={ds.date}
                dateTime={post.publishedAt}
              >
                {pubDate}
              </time>
            </div>
          </ArticleHeader>

          <ArticleBody>
            <Adsense
              client={NEXT_PUBLIC_ADSENSE_CLIENT}
              slot={NEXT_PUBLIC_ADS_ARTICLE_IN_SLOT}
            />
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </ArticleBody>

          <ArticleFooter>
            <aside>
              <TagList tags={post.tags} />
            </aside>

            <section>
              <h2>Share</h2>
              <Share title={post.title} path={path} />
            </section>

            <ButtonLink link='/' label="トップに戻る" />

            <Adsense
              client={NEXT_PUBLIC_ADSENSE_CLIENT}
              slot={NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT}
            />
          </ArticleFooter>
        </Container>
      </Article>
    </>
  )
}
