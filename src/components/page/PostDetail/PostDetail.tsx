import { clsx } from "clsx";

import { Adsense } from "@/components/apps/Adsense/Adsense";
import { RelatedPosts } from "@/components/features/post/RelatedPosts/RelatedPosts";
import { ShareList } from "@/components/features/social/ShareList/ShareList";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import { Container } from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import { TagList } from "@/components/ui/TagList/TagList";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";
import { datetimeToDate } from "@/utilities/Date";

import type { PostProps } from "./type";

export const PostDetailPage = ({ post, relatedPosts }: PostProps) => {
  const pubDate = datetimeToDate(post.publishedAt);

  return (
    <CommonLayout>
      <article>
        <Container>
          <div className={clsx("tw:space-y-8")}>
            <header>
              <Heading>{post.title}</Heading>
              <time
                className={clsx("tw:block tw:mt-2")}
                dateTime={post.publishedAt}
              >
                {pubDate}
              </time>
              {post.thumbnail && (
                <img
                  className={clsx("tw:w-full tw:object-scale-down tw:mt-10")}
                  src={post.thumbnail.url}
                  alt={`${post.title}のサムネイル`}
                />
              )}
            </header>

            <div
              className={clsx(
                "tw:prose tw:prose-slate",
                // custom tailwindcss-typography
                "tw:prose-a:transition-colors",
                "tw:prose-a:hover:no-underline tw:prose-a:hover:text-primary tw:prose-a:hover:opacity-70",
                "tw:max-w-full",
              )}
              dangerouslySetInnerHTML={{ __html: post.body }}
            />

            <footer>
              <aside
                className={clsx(
                  "tw:flex tw:justify-between tw:items-center tw:py-5 tw:border-t-[1px] tw:border-t-white",
                )}
              >
                <TagList tags={post.tags} doLink />
              </aside>

              <aside className="tw:flex tw:flex-col tw:items-center tw:gap-y-3 tw:mt-7">
                <Heading as="h2">Share</Heading>
                <ShareList title={post.title} />
              </aside>

              {relatedPosts.length > 0 && (
                <aside className={clsx("tw:mt-16")}>
                  <Heading as="h2">おすすめの記事</Heading>
                  <Adsense
                    client={AdsenseClient}
                    {...AdsenseUnits.relatedPost}
                    wrapperStyles={{ minHeight: "100px" }}
                  />
                  <RelatedPosts posts={relatedPosts} />
                </aside>
              )}
            </footer>
          </div>
        </Container>
      </article>
    </CommonLayout>
  );
};
