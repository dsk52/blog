+++
title = "webpackとPostCSSでtailwindを含んだファイルをコンパイルするところまでやった"
description = "先日Reactのプロジェクトで見た目を触る機会が訪れたので、気になっていた tailwind を導入すべくPostCSSの導入からコンパイルをして別ファイルで吐きつつPurgeCSSところまでやりました"
date = 2020-06-22T00:45:32+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["webpack", "PostCSS"]
+++


素振りで作ってるプロジェクトで React を使っていて、そろそろCSS触ろうと思ったんだけど、よく使っている styled-componentではなく気になってる tailwind を使ってみたかったので、その導入を行った。

webpack で PostCSS を使ってコンパイルしつつ、PurgeCSSで少し容量削減を行うところまで。  
package.json に色々書くとか postcss.config.js に書くとかできるみたいだけど全載せはどう考えても読みにくいので適宜ファイルを分けた。


そういえば、2016年ぶりにPostCSS触ったみたい。全然覚えてなかった。  
[早いしカスタマイズできると噂のPostCSSに触れてみた · PengNote - 勉強した事や行った場所の感想を書くブログ](https://blog.daisukekonishi.com/archives/1920/)

## 環境

- Node.js 12.16.1
- webpack 4
- postcss-loader 3.0.0
- css-loader 3.5.3
- mini-css-extract-plugin 0.9.0
- tailwindcss 1.4.6
- @fullhuman/postcss-purgecss 2.3.0

## 導入

```bash
$ npm install --save-dev webpack webpack-cli css-loader postcss-loader mini-css-extract-plugin @fullhuman/postcss-purgecss

$ npm install tailwindcss
```



```js
const path = require('path')
const webpack = require('webpack')
:
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 別ファイルで書き出すために使用


module.exports = {
    mode: 'production',

    entory: entry: './src/index.tsx',

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js'
    },

    module: {
        rules: [
            :
            {
                test: /\.css/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                    publicPath: path.resolve(__dirname, 'build'),
                    }
                },
                { loader: "css-loader", options: { importLoaders: 1 } },
                { loader: "postcss-loader" }
                ]
            },
            :
        ]
    },

    plugins: [
        :
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        :
    ],

    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        modules: [path.resolve(__dirname, './src'), 'node_modules']
    }
}
```


webpack.config.js の一部ですが、こんな感じにした。
``src/index.css`` は ``src/index.tsx`` で import していて、これをMiniCssExtractPluginで抜き出して ``dist/`` に吐いている。

postcss-loader は postcss.config.js を読んでいて、内容はこんな感じ。

```js
const purgecss = require('@fullhuman/postcss-purgecss')({
  context: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.tsx',
  ],

  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

    return broadMatches.concat(innerMatches)
  }
})

module.exports = {
  plugins: [
    require("tailwindcss")('./tailwindcss-config.js'),
    :
    ...process.env.NODE_ENV === 'production'
    ? [purgecss] : [],
    :
  ]
}
```

本番用ビルドだけ PurgeCSS を追加してる。ドキュメント通りだと思うんだけど、正直ちょっと自信ない。

更にpostcss.config.jsでは、tailwindcss-config.js を読んでる。  
これはほんとにtailwindcssだけの設定。

```js
module.exports = {
    theme: {},
    variants: {
        opacity: ['responsive', 'hover']
    },
    plugins: [],
    corePlugins: {
        float: false,
        objectFit: false,
        objectPosition: false,
    }
}
```

ここの設定で要らないものを指定したのが大きいみたい。

---

とりあえずこれでいけた。  

## やってみて

こっからのサイズ調整は webpack いじるとかPurgeCSSいじるとかその変になってくるのかな。

Tailwind じたいはまだそこまで深く見てないけど utility なレベルの集まりなので結構細かい。
よく使うコンポーネントくらいはほしいなーと思うけどその辺も細かい調整でること考えたらこの思想がいいのかなーとも思えてきた。
欲しくなったら作ればいいんだしもう少し触ってみる
