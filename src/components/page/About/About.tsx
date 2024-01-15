import { clsx } from "clsx";

import { CommonLayout } from "@/components/layouts/CommonLayout";
import { Container } from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import { EXTERNAL_PAGE } from "@/constants/route";

import { Seo } from "./Seo/Seo";

import type { NextPage } from "next";

export const AboutPage: NextPage = () => (
  <CommonLayout>
    <Seo />
    <article>
      <Container>
        <div className={clsx("tw-space-y-4")}>
          <header>
            <Heading>About</Heading>
          </header>

          <div className={clsx("tw-prose tw-prose-slate tw-max-w-full")}>
            <section>
              <Heading as="h2">サイトについて</Heading>
              <p>
                仕事やプライベートで知った技術や、イベントで喋った話・行った話をブログとして残しています。
              </p>
              <p>
                ペンギンが好きな事と何か残す時にノートに書き出す事が多かったのでこの名前。
              </p>
            </section>

            <section>
              <Heading as="h2">私について</Heading>
              <p>鹿児島生まれ京都育ち、今は大阪に住んでます。</p>
              <p>
                興味駆動でWeb周りのことをやってます。
                <br />
                Webフロントエンドとサーバーサイド、マーケティングとか好きです。
                <br />
                好きなものは酒とカレーとラーメン。
              </p>

              <p>
                詳しくは<a href={EXTERNAL_PAGE.PROFILE}>こちら</a>
              </p>
            </section>

            <section>
              <Heading as="h2">免責事項</Heading>

              <p>
                当サイトに掲載されている情報の正確さについて可能な限り努力をしていますが、その正確性や適切性に問題がある場合、告知無しに情報を変更・削除する事があります。
                <br />
                当ブログの情報を用いて行う一切の行為、被った損害・損失に対しては、一切の責任を負いかねます。ご了承ください。
                <br />
                必ず各リンク先、オフィシャルサイトなどをご参照頂き、ご自身の判断、責任にてご利用頂きますようお願い申し上げます。
              </p>
              <p>
                本免責事項及び、当サイトに記載されている情報は予告なしに変更、または削除されることがあります。予めご了承下さい。
              </p>
            </section>

            <section>
              <Heading as="h2">お問い合わせ</Heading>
              <p>
                お問い合わせはTwitter{" "}
                <a href={EXTERNAL_PAGE.TWITTER}>@skd_nw</a>
                までよろしくお願い致します。
                <br />
                <small>
                  ※名前がコロコロ変わりますが、アイコンは青いペンギンです。
                </small>
              </p>
            </section>
          </div>
        </div>
      </Container>
    </article>
  </CommonLayout>
);
