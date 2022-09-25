import getConfig from "next/config";
import Link from "next/link";
import React from "react";

import { ROUTE } from '../../../constants/route';
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

export const DetailPage = ({ post, path, draftKey }: DetailProps) => {
  const pubDate = datetimeToDate(post.publishedAt)

  return (
    <>
      {draftKey && (
        <div>
          現在プレビューモードで閲覧中です。
          <Link href={`/api/exitPreview`}>
            <a>プレビューを解除</a>
          </Link>
        </div>
      )}

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
              <TagList tags={post.tags} doLink />
            </aside>

            <section>
              <h2>Share</h2>
              <Share title={post.title} path={path} />
            </section>

            <ButtonLink link={ROUTE.top} label="トップに戻る" />

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
