+++
title = "Next.jsとmicroCMSを使って簡易的なブログを作った"
description = "Next.jsとheadlessCMSであるmicroCMSを使って簡易的なブログを作ってみたのでその覚書"
date = 2021-03-08T00:07:50+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Next.js", "headressCMS"]
+++


Next.jsとheadlessCMSであるmicroCMSを使って簡易的なブログを作ってみたのでその覚書。  
Next.jsはずいぶん前に少し触って簡単なものを作ったくらいで久々に触りたかったのと、TypeScriptを絡めた時にどんな感じにするんだっけっていうのを手を動かしておきたかったのがきっかけです。

あと、この手のコンテンツ投稿するタイプのものを作るときって、これまではWordPressとかconcrete5みたいなCMSを使っての構築が多かったです。  
最近はこれらから離れているのと headlessCMS みたいなサービスを使った構築をそろそろやっとくべきかなと思っての素振りです。(Airtable触ってたような)

今回はコンテンツはあんまり頻繁に変わらない前提で、CMSでコンテンツ作成→SSGする想定です。  
ちなみに、microCMS が Webhook に対応してGithub Actionsへの通知ができるらしいので、コンテンツ更新時にビルドして生成物の公開までもっていけそうです。  
[GitHub ActionsへのWebhook通知に対応しました](https://blog.microcms.io/webhook-for-github-actions/)

## 環境

- Next.js v10.0.7
- TypeScript v4.0 
- microCMS

create-next-app の ``--example with-typescript`` をベースに作りました

[next.js/examples/with-typescript at canary · vercel/next.js](https://github.com/vercel/next.js/tree/canary/examples/with-typescript)


## microCMS側

サービスへの登録後 ``/post`` なエンドポイントを作成し、フィールドとしてタイトルと本文を作成しました

```
{
    "title": string,
    "body": string,
}
```

数記事作成後、APIプレビューが確認できて、実際のエンドポイントに対してリクエストとそのレスポンスが確認できました。地味にありがたいですね。

また、コンテンツの詳細には、上記に加えて以下のパラメータがくっついた状態で保存されるみたいです。

```
{
  "title": string,
  "body": string,
  
  // 以下microCMS側の追加パラメータ
  "id": string
  "createdAt": string
  "updatedAt": string
  "publishedAt": string
  "revisedAt": string
}
```

## Next.jsでページの生成を行う

``pages/posts`` 下に一覧ページと詳細ページを作ります。

```
$ tree -L 1 pages/posts/
pages/posts/
├── [id].tsx
└── list.tsx
```

今回はやりかけたあたりで流れてきた弁護士ドットコムさんの構成を参考に作ってみました。  
[弁護士ドットコムライブラリーのフロントエンドのアーキテクチャ（Next.js + TypeScript） - パンダのプログラミングブログ](https://panda-program.com/posts/bengo4com-library-frontend)

取り入れたのは、interactors と types の切り方です。

interactors はNetwork層を扱って、通信やレスポンスをアプリケーション内で使用する形にマッピングする部分。 

types は api と domain に分けて、以下のようにしました

- api は microCMS からのレスポンスの型定義
- domain アプリケーション内の型定義

詳細は先程の記事を参照してください。


### 一覧ページ

生成のため、事前に情報を取得するのでここで一覧取得のメソッドを実行。  
mapperで整理したものを渡すようにしてます。

``` tsx
export const getStaticProps: GetStaticProps = async () => {
  const posts = await new PostInteractor().getAll()

  return {
    props: {
      posts,
    },
  }
}
```


### 詳細ページ

こっちが初だったのでちょっと悩んだところで、生成するパスを準備して、それを元に詳細ページ用のデータを取得してレスポンスでデータを生成することになるみたいです。

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await new PostInteractor().getAll()

  const paths = await posts.contents.map((post) => ({
    params: { id: post.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: Params) => {
  const contentId = params.id
  if (!contentId) {
    return
  }
  const post = await new PostInteractor().getById(contentId)

  return {
    props: {
      post,
    },
  }
}
```

Readは無制限だったと思いますが、記事数が多いと生成ごとに結構リクエストが飛ぶので、データのとり方が他に無いのかちょっと気になるところです。


## スタイルについて

まだほとんど触ってませんが、 pages/_app に sanitize.css や global.css を読み込む形にして、各所コンポーネントでは CSS Modules をコンポーネントと同じ階層に配置。improtする形にしました。

```
compontnts/
├── component.tsx
└── component.module.css
```

Reactのアプリケーションを作る際、この辺はDjangoのappを分割するときみたいにコンポーネントごとにまとめるようにしてます。

---

## やってみて
まだ手探り状態ですが、結構新鮮だなーって感じでした。

microCMS側も色々フィールド作れたりして便利そうなのでもう少し触ってみてもいい気がします。
タグつけるとかサムネイルとして画像設定できるようにするとか
