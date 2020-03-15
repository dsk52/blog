+++
author = "Daisuke Konishi"
date = "2017-03-30T16:35:09+09:00"
tags = ["sass"]
categories = ["クリエイティブ"]
description = "SassでWebフォントのimportができることを知ったのでその覚書"
title = "SassでNoto Sans(Webフォント)を読み込む"

+++

## 背景
Noto Sansの中国語版を使う時に、フォント事態は[Google Web Fontsで公開されてる](https://fonts.google.com/earlyaccess#Noto+Sans+SC)けど読み込みってどうやるんだっけってなって調べてたのでメモ。

[中国語フォント（ゴシック） : Noto Sans SC](https://fonts.google.com/earlyaccess#Noto+Sans+SC)

ちなみに、Google Web FontであがってるNot Sansは以下で確認出来るみたい。
[https://www.google.com/get/noto/](Google Noto Fonts)

## 方法
``_fonts.scss`` なんかで以下を記述。

```scss
@import url(//fonts.googleapis.com/earlyaccess/notosanssc.css);
```

あとはフォントの指定を行えばOK

```scss
$font-cn: "Noto Sans SC", "游ゴシック", YuGothic, "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo", sans-serif;

.u-ff-cn {
    font-family: $font-cn;
}
```


### パフォーマンスにも良さそう？
前まで、Google Web Fontsが生成する``<link >``を ``<head>`` に入れていたので、多分アクセス毎にリクエスト飛ぶ(別のページで読み込んだ事があればリクエスト無し)と思うのでウーンって感じだった。
でもこの方法なら、Sassのコンパイル時にリクエストを飛ばしてそうなのでユーザー側でのリクエスト数減ってパフォーマンスちょっとだけ良くなりそう。

と思ったけど、コード見たら普通に ``@import`` で書いてあったので多分リクエスト数は減らないので**パフォーマンスの件では ``<link >`` 読み込みとそこまで変わらなさそう**。

## 参考
 [[最新版] Noto Sans JapaneseをWebフォントとして使う方法](http://toach.click/how-to-noto-sans-japanese/)


## おまけ
実際によく使うのは NotoSans Japaneseの方なのでこっちもメモ

```scss
/* ======================================================
  日本語フォント（ゴシック） : Noto Sans Japanese
  https://fonts.google.com/earlyaccess#Noto+Sans+Japanese
  font-family: 'Noto Sans Japanese', sans-serif;
====================================================== */
@import url(http://fonts.googleapis.com/earlyaccess/notosansjapanese.css);
```
