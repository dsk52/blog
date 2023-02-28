import { Adsense } from "@/components/apps/Adsense/Adsense";
import ds from "@/components/features/post/PostList/PostItem/PostItem.module.css";
import { ShareList } from "@/components/features/social/ShareList/ShareList";
import {
  ArticleHeader,
  ArticleBody,
  ArticleFooter,
  Article,
} from "@/components/layouts/Article/Article";
import { Container } from "@/components/ui/Container/Container";
import { ButtonLink } from "@/components/ui/link/ButtonLink/ButtonLink";
import { TagList } from "@/components/ui/TagList/TagList";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";
import { ROUTE } from "@/constants/route";
import { datetimeToDate } from "@/utilities/Date";

import type { DetailProps } from "./type";

export const DetailPage = ({ post, path }: DetailProps) => {
  const pubDate = datetimeToDate(post.publishedAt);

  return (
    <>
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
            <Adsense client={AdsenseClient} {...AdsenseUnits.articleIn} />
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

            <Adsense client={AdsenseClient} {...AdsenseUnits.articleBottom} />
          </ArticleFooter>
        </Container>
      </Article>
    </>
  );
};
