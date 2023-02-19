import getConfig from "next/config";
import Link from "next/link";

import { Adsense } from "@/components/apps/Adsense/Adsense";
import { ShareList } from "@/components/features/social/ShareList/ShareList";
import {
  ArticleHeader,
  ArticleBody,
  ArticleFooter,
  Article,
} from "@/components/layouts/Article/Article";
import { ButtonLink } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { TagList } from "@/components/ui/TagList/TagList";
import { ROUTE } from "@/constants/route";
import { datetimeToDate } from "@/utilities/Date";

import type { DetailProps } from "./type";

import ds from "@/components/ui/PostList/PostItem/PostItem.module.css";

const { publicRuntimeConfig } = getConfig();

const {
  NEXT_PUBLIC_ADSENSE_CLIENT,
  NEXT_PUBLIC_ADS_ARTICLE_IN_SLOT,
  NEXT_PUBLIC_ADS_ARTICLE_BOTTOM_SLOT,
} = publicRuntimeConfig;

export const DetailPage = ({ post, path, draftKey }: DetailProps) => {
  const pubDate = datetimeToDate(post.publishedAt);

  return (
    <>
      {draftKey && (
        <div>
          現在プレビューモードで閲覧中です。
          <Link href={`/api/exitPreview`}>プレビューを解除</Link>
        </div>
      )}

      <Article>
        <Container>
          <ArticleHeader>
            <h1>{post.title}</h1>
            <div className={ds.meta}>
              <time className={ds.date} dateTime={post.publishedAt}>
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
              <ShareList title={post.title} path={path} />
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
  );
};
