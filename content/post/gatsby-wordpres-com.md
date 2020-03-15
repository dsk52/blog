+++
title = "WordPress.comのデータをもとにGatsbyJSでサイトを作る"
description = "Gatsby"
date = 2018-11-15T23:22:00+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["React", "GatsbyJS"]
+++

触ってみたかった。ただそれだけ。

[GatsbyJS](https://www.gatsbyjs.org/)はReact製の静的サイトジェネレーターで、最近ちょっと名前を見かける。ような気がしたけど一瞬誰かが触ってみるって言ってたのを見かけただけかも。

## 今回の環境

* Node.js 8.11.1
* npm 6.1.0
* gatsby-cli 2.4.5

* gatsby 2.0.19
* gatsby-source-wordpress 3.0.0

プラグインのバージョンについては後述。

できたものは[ココ](https://github.com/d-kusk/koniatume)においてる。
``.env.sample`` から ``.env`` を作って値はめたら動くはず。
※直近は動くかもしれないけど、数週間後数ヶ月後も動作するかは保証しかねます。

## 環境の準備
CLIを入れて、サイトを立ち上げるまで

```shell
$ npm install --global gatsby-cli

$ gatsby -v
2.4.5
```

```shell
$ gatsby new SITE_NAME
```

```shell
$ cd SITE_NAME
$ yarn start
```

デフォルトで用意されているサイトがビルドされて、ローカルサーバーが起動する。   **http://localhost:8000** でアクセスできる。

## WordPress.comからデータを引っ張る
やり方は簡単で、こんな感じ

1. [gatsby-source-wordpress](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/)っていうプラグインを入れて、
2. configに設定を追加
3. コンポーネント側に表示用のコードを追加

### gatsby-source-wordpress を追加
WordPressのデータをなめてページを生成するプラグイン。  
自前でホスティングしているものはもちろん。wordpress.com で運用しているサイトにも対応している。
.comのWordPressサイトしか無いのでありがたかった。  
使ってないので別に良いんだけど、ACFにも対応してるのはびっくりした。

```shell
$ yarn add gatsby-source-wordpress
```

※今回、公開時最新は 3.0.14 なんだけど、 GraphQLで試してる時にどうやっても ``allWordpressPost`` が使えなくて、直近のバージョンに落としても使えなくて、 **思い切って 3.0.0 まで下げた** ら使えたのでこのバージョンを使っています。

### gatsby-config.jsに設定を追加

```js
plugins: [
  {
    resolve: `gatsby-source-wordpress`,
    options: {
      baseUrl: `WORDPRESS_SITE_DOMAIN`,
      protocol: `https`,
      hostingWPCOM: true,
      useACF: false,  // default true
      auth: {
        wpcom_app_clientSecret: process.env.WORDPRESS_CLIENT_SECRET,
        wpcom_app_clientId: process.env.WORDPRESS_CLIENT_ID,
        wpcom_user: process.env.WORDPRESS_USER,
        wpcom_pass: process.env.WORDPRESS_PASSWORD,
      },
      verboseOutput: true,
      perPage: 100,
      concurrentRequests: 10,
      includedRoutes: [
        "/*/*/categories",
        "/*/*/posts",
        :
      ],
    }
  },
  'gatsby-plugin-react-helmet',
  :
}
```

[dotenv](https://github.com/motdotla/dotenv)でトークン部分を環境変数から読み込むようにしています。  
ファイルの頭の方に以下を記述。

```
require('dotenv').config()
```

WordPress.comからデータを引っ張るのには、アクセストークンが必要なので、[デベロッパーサイト](https://developer.wordpress.com/)から取得してください。

上手くいっていると、 ``yarn start`` でビルドが通ってローカルサーバーが立ち上がります。

また、**http://localhost:8000/___graphql** でIDEが立ち上がってGraphQLでデータを取得できるか確認できます。

例えばこんなの。

```
{
  allWordpressPage {
    edges {
      node {
        id
        title
        content
        excerpt
        date
        modified
        slug
        status
      }
    }
  }
}
```

あとは、これを[Viewに追加](https://github.com/d-kusk/koniatume/commit/84527b6249b612430149cff7c671ed5be8f4f8a3#diff-84099094c0c18f11b3c43fe0e8959b97)するとページに表示されます。


## やってみて
流れは簡単だし、色んなものがソースに使えるっぽいので割と夢が広がる。  
サンプルで作ったリポジトリ名もそれ。

ただ、プラグインのバグなのかデータが引けなくなってたのが辛かった。
