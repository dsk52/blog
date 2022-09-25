import { EXTERNAL_PAGE } from "../../../constants/route";
import { Container } from '../../Container/index';
import { Article, ArticleBody, ArticleHeader } from "../../layouts/Article/Article"
import { MainTitle } from "../../ui/Title/Title"

const AboutPage = () => (
  <Article>
    <Container>
      <ArticleHeader>
        <MainTitle>About</MainTitle>
      </ArticleHeader>

      <ArticleBody>
        <section>
          <h2>サイトについて</h2>
          <p>仕事やプライベートで知った技術や、イベントで喋った話・行った話をブログとして残しています。</p>
          <p>ペンギンが好きな事と何か残す時にノートに書き出す事が多かったのでこの名前。</p>
        </section>

        <section>
          <h2>私について</h2>
          <p>鹿児島生まれ京都育ち、今は大阪に住んでます。</p>
          <p>興味駆動でWeb周りのことをやってます。</p>
          <p>Webフロントエンドとサーバーサイド、マーケティングとか好きです。</p>
          <p>好きなものは酒とカレーとラーメン。</p>

          <p>詳しくは<a href={EXTERNAL_PAGE.PROFILE}>こちら</a></p>
        </section>

        <section>
          <h2>免責事項</h2>

          <p>当サイトに掲載されている情報の正確さについて可能な限り努力をしていますが、その正確性や適切性に問題がある場合、告知無しに情報を変更・削除する事があります。</p>
          <p>当ブログの情報を用いて行う一切の行為、被った損害・損失に対しては、一切の責任を負いかねます。ご了承ください。</p>
          <p>必ず各リンク先、オフィシャルサイトなどをご参照頂き、ご自身の判断、責任にてご利用頂きますようお願い申し上げます。</p>
          <p>本免責事項及び、当サイトに記載されている情報は予告なしに変更、または削除されることがあります。予めご了承下さい。</p>
        </section>

        <section>
          <h2>お問い合わせ</h2>
          <p>お問い合わせはTwitter <a href={EXTERNAL_PAGE.TWITTER}>@skd_nw</a>までよろしくお願い致します。<br />
            <small>※名前がコロコロ変わりますが、アイコンは青いペンギンです。</small></p>
        </section>
      </ArticleBody>
    </Container>
  </Article>
)

export default AboutPage
