+++
title = "Reactのコンポーネント内でスクロール位置を取得する"
description = "Reactでスクロール位置が取得できず困っていたんだけど、ようやくやり方が分かったので備忘録"
date = 2018-08-03T09:30:25+09:00
image = "images/common/react.png"
tags = ["JavaScript", "React"]
categories = ["クリエイティブ"]
+++


Reactでスクロール位置が取得できず困っていたんだけど、ようやくやり方が分かったので備忘録

## 動作確認環境

* React: v16.4.1

## サンプルコード

```
import React, { Component } from 'react'

class Scroller extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            currentPosition: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', event => this.watchCurrentPosition(), true)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll')
    }

    watchCurrentPosition() {
        console.log(this.scrollTop())
    }

    scrollTop() {
        return Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop);
    }

    render() {
        return (
            <div>
                <p>Scroll Top: {this.state.currentPosition}</p>
            </div>
        )
    }
}

export default Scroller
```

## サンプルはいくつか出てきた
イベントの設定で、以下の2つが出てきた。

* ``window.addEventListener('scroll', someFunction())``
* ``ReactDOM.findDOMNode(this.refs.Hoge).addEventListener('scroll', someFunction())``

前者がウィンドウオブジェクトにイベントをセットしてウィンドウ自体のスクロールを検出する方で、もう片方がReactDOMでコンポーネントにアクセスしてそのコンポーネントのスクロールを取得する方法。

今回欲しかったのは前者なので前者で試してたんだけど、スクロールイベントが発火しなかった。


## addEventLisener のイベントが発火しなかった

色んな記事で、下記のような書き方をされていたんだけど、**イベントが発火しなかった**。

```
window.addEventListener('scroll', someListenScrollFunction())
```

ReactのIssueで、「[キャプチャモードを変える(第3引数に true をセットする)とイベントが発火する](https://github.com/facebook/react/issues/5042#issuecomment-145317519)」ってコメントを見つけてそれでやったらイベントを発火するのを確認できた。


## その他参考

- [Reactでスクロール位置を表示してみる - Qiita](https://qiita.com/IgnorantCoder/items/3b66c9e96c2f24e0d09e)
- [JavaScriptのスクロールイベントをlodashで間引く方法 - WPJ](https://www.webprofessional.jp/throttle-scroll-events/)

## あとがき
もともと jQuery でコードが書かれてたんだけど、いつの間にか動かなくなっていて調整しなきゃいけなくなったのがキッカケ。
併用すると割と不具合にぶつかって泣けたし一緒に使いたくない…
