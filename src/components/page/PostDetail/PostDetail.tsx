import clsx from "clsx";

import { Adsense } from "@/components/apps/Adsense/Adsense";
import { RelatedPosts } from "@/components/features/post/RelatedPosts/RelatedPosts";
import { ShareList } from "@/components/features/social/ShareList/ShareList";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import { Container } from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import { TagList } from "@/components/ui/TagList/TagList";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";
import { datetimeToDate } from "@/utilities/Date";

import { Seo } from "./Seo/Seo";

import type { PostProps } from "./type";

export const PostDetailPage = ({ post, relatedPosts }: PostProps) => {
  const pubDate = datetimeToDate(post.publishedAt);

  return (
    <CommonLayout>
      <Seo
        title={post.title}
        slug={post.slug}
        publishedAt={post.publishedAt}
        thumbnail={post.thumbnail}
      />
      {/* <DetailPage post={post} relatedPosts={relatedPosts} draftKey={draftKey} /> */}

      <article>
        <Container>
          <div className={clsx("tw-space-y-8")}>
            <header>
              <Heading>{post.title}</Heading>
              <time dateTime={post.publishedAt}>{pubDate}</time>
              {post.thumbnail && (
                <img
                  className={clsx("tw-w-full tw-object-scale-down tw-mt-10")}
                  src={post.thumbnail.url}
                  alt={`${post.title}のサムネイル`}
                />
              )}
            </header>

            <div
              className={clsx("tw-prose tw-prose-slate tw-max-w-full")}
              dangerouslySetInnerHTML={{ __html: post.body }}
            />

            <footer>
              <aside
                className={clsx(
                  "tw-flex tw-justify-between tw-items-center tw-p-4 tw-border-t-[1px] tw-border-t-white",
                )}
              >
                <TagList tags={post.tags} doLink />
              </aside>

              <aside className="tw-flex tw-flex-col tw-items-center tw-gap-y-3 tw-mt-7">
                <Heading as="h2">Share</Heading>
                <ShareList title={post.title} />
              </aside>

              <aside className={clsx("tw-mt-16")}>
                <Heading as="h2">おすすめの記事</Heading>
                <Adsense
                  client={AdsenseClient}
                  {...AdsenseUnits.relatedPost}
                  wrapperStyles={{ minHeight: "100px" }}
                />
                <RelatedPosts posts={relatedPosts} />
              </aside>
            </footer>
          </div>
        </Container>
      </article>
    </CommonLayout>
  );
};
