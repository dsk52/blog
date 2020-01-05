+++
title = "Node.jsからAirtableの情報を取得するところまでやってみた"
description = ""
date = 2020-01-05T16:11:33+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Node.js", "Airtable"]
+++

Airtable は contentful みたいな CMS の 1 つで、ブラウザからデータ管理を行ったり、プログラムから API 経由でデータの取得ができるツールです。Airtable 上にアプリを作成し、そこでデータの設計とか管理を行っていきます。Kintone にちょっと近いものを感じました。

[Airtable](https://airtable.com/)

今回はその Airtable に対して Node.js からデータの取得を行った時の覚書を思い出しながら書いてます。

## 環境

-   Node.js 10.15.0
-   airtable-node 0.1.20

今回、[airtable-node - npm](https://www.npmjs.com/package/airtable-node)というパッケージを使いました。別で Airtable オフィシャルの[airtable - npm](https://www.npmjs.com/package/airtable)もあるんですが、今回使ったパッケージの方が使いやすかった気がするのでこっち採用です。メンテを考えたらオフィシャルの方を使うのがいい気はします。

(Node.js のバージョン上げなきゃですね…

## 前準備

Netlify 側の設定(リポジトリの紐付けなど)と App の作成、データの入力は省きます。

Airtable の API Key と App ID を用意します。

### API Key の取得

Airtable のアカウントページから取得できます。
アカウントページには、ダッシュボード右上の自分のアイコンをクリック後にプルダウン表示される「Account」から遷移できます。

### App ID

Airtable 上での App が作成されている状態で、以下のページへ遷移します。

[Standard API](https://airtable.com/api)

作成した App が表示されているので選択すると、API でのアクセス方法が色々書かれたページに遷移します。
App ID は INTRODUCTION の真ん中辺りに緑文字で表示されていました。(記事作成時)

このページが、自分が作成した App 用に自動生成されたドキュメントになるので、ここを参考にコードを書くと良いかと思います。

## データの取得をしてみる

今回は Works の App を用意していて、ここから取得します。

事前準備として先程用意した API Key と App ID を環境変数に設定しておきましょう。
こういうコードで取得できました。

```
import Airtable from 'airtable-node'

const getWorks = () => {
  return new Promise((resolve, reject) => {
    const { AIRTABLE_API_KEY, APP_ID } = process.env
    const worksTable = new Airtable({ apiKey: AIRTABLE_API_KEY })
      .base(APP_ID)
      .table('works')

    return worksTable
      .list({
        view: 'Grid view' // 作成したAppで使用しているViewを指定
      })
      .then(response => {
        resolve(response)
      })
  })
}
```

この関数の返り値に records というパラメーターで配列形式で入ってくるのであとはそれを上手く使ってあげれば OK です。
