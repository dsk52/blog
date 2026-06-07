import { clsx } from "clsx";

import { Adsense } from "@/components/apps/Adsense/Adsense";
import { RelatedPosts } from "@/components/features/post/RelatedPosts/RelatedPosts";
import { ShareList } from "@/components/features/social/ShareList/ShareList";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import { TagList } from "@/components/ui/TagList/TagList";
import { AdsenseClient, AdsenseUnits } from "@/constants/google";
import { ROUTE } from "@/constants/route";
import { yyyyMMddFormatter } from "@/utilities/Date";

import type { PostProps } from "./type";

export const PostDetailPage = ({ post, relatedPosts }: PostProps) => {
  const pubDate = yyyyMMddFormatter.format(new Date(post.publishedAt));

  return (
    <CommonLayout>
      <Container>
        <div className={clsx("tw:space-y-8")}>
          <article>
            <header>
              <div className="tw:mx-auto tw:w-full tw:max-w-[48rem]" data-testid="post-header-wrap">
                <Heading>{post.title}</Heading>
                <div className={clsx("tw:flex tw:justify-between tw:items-center")}>
                  <time className={clsx("tw:block")} dateTime={post.publishedAt}>
                    {pubDate}
                  </time>
                  <div className="tw:flex-1 tw:justify-items-end">
                    <TagList tags={post.tags} doLink />
                  </div>
                </div>
                {post.thumbnail && (
                  <img
                    className={clsx("tw:w-full tw:object-scale-down tw:mt-10")}
                    src={post.thumbnail.url}
                    alt={`${post.title}のサムネイル`}
                  />
                )}
              </div>
            </header>

            <div
              className="tw:mx-auto tw:mt-10 tw:w-full tw:max-w-[48rem]"
              data-testid="post-body-wrap"
            >
              <div
                className={clsx(
                  "tw:prose tw:prose-slate tw:max-w-none",
                  // custom tailwindcss-typography
                  "tw:prose-p:my-[1.4em] tw:prose-p:leading-[1.9]",
                  "tw:prose-ul:my-6 tw:prose-ol:my-6 tw:prose-li:my-1",
                  "tw:prose-h2:mt-16 tw:prose-h2:mb-6",
                  "tw:prose-h3:mt-10 tw:prose-h3:mb-4",
                  "tw:prose-pre:my-8 tw:prose-pre:px-5 tw:prose-pre:py-4 tw:prose-pre:leading-7",
                  "tw:prose-a:transition-colors",
                  "tw:prose-a:hover:no-underline tw:prose-a:hover:text-primary tw:prose-a:hover:opacity-70"
                )}
                data-testid="post-body"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: ブログ記事のHTML表示で必要
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            </div>
          </article>

          <footer className="tw:border-t-[1px] tw:border-t-white tw:py-5">
            <Breadcrumb
              items={[
                { label: "ホーム", href: ROUTE.top },
                { label: "記事一覧", href: ROUTE.postList(1) },
                { label: post.title },
              ]}
              className="tw:mb-6"
            />

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
    </CommonLayout>
  );
};
