import { Adsense } from "@/components/apps/Adsense/Adsense";
import ds from "@/components/features/post/PostList/PostItem/PostItem.module.css";
import { RelatedPosts } from "@/components/features/post/RelatedPosts/RelatedPosts";
import { ShareList } from "@/components/features/social/ShareList/ShareList";
import {
  ArticleHeader,
  ArticleBody,
  ArticleFooter,
  Article,
} from "@/components/layouts/Article/Article";
import { Container } from "@/components/ui/Container/Container";
import { TagList } from "@/components/ui/TagList/TagList";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";
import { datetimeToDate } from "@/utilities/Date";

import detailStyle from "./style.module.css";

import type { DetailProps } from "./type";

export const DetailPage = ({ post, relatedPosts }: DetailProps) => {
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
            {/* <Adsense client={AdsenseClient} {...AdsenseUnits.articleIn} /> */}
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </ArticleBody>

          <ArticleFooter>
            <aside className={detailStyle.tagList}>
              <TagList tags={post.tags} doLink />
              <ShareList title={post.title} />
            </aside>

            <aside className={detailStyle.relatedPost}>
              <h2>おすすめの記事</h2>
              <Adsense client={AdsenseClient} {...AdsenseUnits.relatedPost} />
              <RelatedPosts posts={relatedPosts} />
            </aside>
          </ArticleFooter>
        </Container>
      </Article>
    </>
  );
};
