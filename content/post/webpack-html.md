+++
title = "webpackでHTMLのheadやbodyに要素を追加する"
description = "自分でwebpackの設定ファイルを書き始めたんですが、その時にindex.htmlに要素を追加したいなってなった際にどうやったかの覚書"
date = 2020-06-06T16:33:52+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["webpack"]
+++


Webフロントエンドの実装をするときって React を使うことが多いんですが、その際の環境構築は create-react-app を使って開発に入っていました。

この間ふと webpack.config ~ を自分で書いてみたくなって、その中で HTML 側でやりたいことができて調べてやってみたのでその覚書です。

## 環境周り

- webpack 4.43.0
- webpack-cli 3.3.11

## やりたかったこと(試したかったこと)

- index.htmlには最低限だけ書いておく
- JSファイルみたいな生成するものは、HTMLでの読み込みファイル名にクエリを付ける

## まだできていないこと

- reset CSS系のファイルはJSに入れないで、HTMLのheadタグ内に追加する


## やったこと

[html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/) でほとんど達成できた。

html-webpack-plugin を plugins で指定して、オプションで inject と hash を入れた。
inject はそもそも要素を追加するか/しないかみたいな話と、追加する場合にどこにかっていう指定ができる。 (追加する順番まではわからない…)

``` js
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },
  :
  plugins: [
      new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: 'body',
      hash: true,
    })
  ]
}
```

public/index.html は以下のような内容。

``` html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello</title>
</head>
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
</body>
</html>
```

VSCodeのEmmet拡張でテンプレートを展開して root の要素を置いただけ。

ビルドすると、 ``<script src="/main.js?9f42faeda8e1663136f1"></script>`` みたいなハッシュクエリ付きの読み込み指定が入った script タグが追加されて、 build/index.html が生成される。

ejs 使う記事が結構出てくるんだけど、それはちょっとと思って避けたらこのプラグインだけでできた。

ただ、以下についてはまだ分かってなくて、とりあえず index.tsx で import かけてる。

> reset CSS系のファイルはJSに入れないで、HTMLのheadタグ内に追加する

mini-css-extract-plugin でできそう
[MiniCssExtractPlugin | webpack](https://webpack.js.org/plugins/mini-css-extract-plugin/)


## やってみて
いじりだすと色々できるんだけど、本筋じゃないところで凝り始めそうなので、暇な時にガッと作って置いとくほうがいいかなーと思った。
