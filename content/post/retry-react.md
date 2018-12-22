+++
description = "Reactのリハビリを"
title = "Reactのリハビリがてら、WordPress.comのAPIを叩いて、Reactでレンダリングさせるまでをやった"
author = "Daisuke Konishi"
date = "2017-08-17T02:02:30+09:00"
tags = ["JavaScript","React"]
categories = ["クリエイティブ"]
image = "images/common/react.png"
+++

周りでやってる人も増えてきたのと、ちょっとWordPressのWP REST APIと絡めてReactのリハビリをしようと思って最近また少しずつ触ってる。

前Reactを触ってたときはv0.12くらい？でオライリーの侍本が出る少し前だった気がする。  
今回は現時点最新の以下のバージョン

- React v15.6.1

先月登壇キッカケでWordPress.comでごはん/自炊ブログを作ったのですが、それを題材にちょっとした地図系のWebアプリを作るところまでいく予定。

## create-react-appで始めた
[create-react-app](https://github.com/facebookincubator/create-react-app)は、Reactの環境と雛形を作ってくれるモジュール。

以下で、コマンドが使えるようになる。

```
$ npm install -g create-react-app
```

これを入れておくと、以下でアプリの雛形と環境が生成できる。ただ長い。

```
$ create-react-app APP_NAME
```

この間のReact.kyotoでも紹介されていた[Next.js](https://github.com/zeit/next.js/)も気になったんだけど、久々だしサッと始めたかったからcreate-react-appにした。  
今回は1ページだけの予定だからいいけど、今後増えるなら [react-router](https://github.com/ReactTraining/react-router) を使わないと **ルーティングはできない** らしい。覚えとかないと。

## リクエスト処理はsuperagentで。
これまでリクエストは、jQueryの$.AjaxとかXMLHttpRequestでやっていた。
プライベートだしReact触るし、jQuery離れてみようって思ってちょくちょく名前を聞くsuperagentにしてみた。Fetchでも良かったんだろうけど、あんまりよく分かってないのでとりあえず。

個人的には、requestに対して ``.get()`` とか ``.post()`` とかをメソッドチェーンな感じで繋いでいくのは馴染みがあっていい。以上です。


## stateの使い方とライフサイクルに悩んだ
久々にやったことで、ふんわり覚えかけていたstateやpropsのことはすっかり忘れて困惑した。基本的な所は思い出したけど、コンポーネントの子の方までリレーしたり、子から親に投げるみたいな事もちゃんと出来るようにしておきたい。

あと、今回リクエストやデータの受け渡しをするにあたって、ライフサイクルについて少し悩んだ。 ``componentDidMount()`` のタイミングだとAPIはまだ叩けてなくてデータが空なんだけど、叩いた後にstateやpropsの更新方法がよく分からなくて困った。

[React.jsのComponent Lifecycle - Qiita ](http://qiita.com/koba04/items/66e9c5be8f2e31f28461)

このページが結構分かりやすかったから参考に組んだ。結局propsの更新は、``componentWillReceiveProps()``で対応した。

>Propが更新される時に呼ばれます。ちなみにComponentが新しくDOMツリーに追加される時には呼ばれません。
親ComponentのStateがPropとして渡されていて、その値が変化した時に画面の表示以外で何かしたいときに使う感じです。Notification的な？
>
> 後はPropの値に応じてStateの値を更新したいようなときに使います。

## レンダリングできた
API叩いてとれたデータをオブジェクトに入れるのか、配列に入れるのかで悩んでた。  
よく出てくるサンプルが ``map`` でループさせて突っ込むみたいなのが多くて、オブジェクトで似たようなことやると上手くいかなかったので配列にした。  
あとはそのデータをループ回しながらテンプレートに流し込む処理にあてたら表示できた。

## そういえばリクエストの返り値に住所データが無い
投稿データからタイトルやリンクなんかを取得してリストにするところまで出来てから気づいたんだけど、おそらく投稿でセットした住所が入っているであろう ``geo`` に何も入ってなくて、falseになってる。他にも見当たらないしつらい。


## 今後
とりあえずpropTypes入れるとか(Flow触ってみるとか)、CSS in JSとか、CSS Modules とかこの間聞いたCSSをうまいこと管理するやつを試していきたい。

そのずっと先で興味湧いたらSPAとかPWAとかその辺やる。
