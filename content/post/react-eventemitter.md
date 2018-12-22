+++
title = "ReactでEventEmitterを使って子コンポーネント同士の通信を行ってみた"
description = "Reactで実装をしているときに、子コンポーネント同士で通信する必要があったんだけど、子コンポーネント間が遠くてちょっとしんどいなーと思っていたとき、EventEmitterを見つけたので使い方のメモ"
categories = ["クリエイティブ"]
tags = ["React"]
image = "images/common/react.png"
date = 2018-03-05T01:37:48+09:00
author = "Daisuke Konishi"
+++


## はじめに
Reactで趣味プロダクトを作っているのですが、途中子コンポーネント同士でのやり取りがしたくて、発行購読パターンみたいな事がしたいなと思ったんですが、何かいい方法があるのかなーと思って調べていると、EventEmitterの存在を知ったので使ってみました。

## EventEmitterとは
> EventEmitterは直訳の通り、イベントを発火することができる機能で、主に「イベントを発火する人」と「イベントを受け取る人」の大きく2つに使い方が分かれます。

Node.jsの組み込みモジュールが有名なのかな？

## やってみる
EventEmitterを使う上で、最初はこの[EventEmitter](https://www.npmjs.com/package/EventEmitter)を使ってみていたのですが、Netlifyでエラーを吐いたので、[fbemitter](https://www.npmjs.com/package/fbemitter)を使ってみました。

こんな感じで書いたら使えました。

```
// Parent.js
import {EventEmitter} from 'fbemitter'

:
constructor () {
  super()
  this.emitter = new EventEmitter()
}

render () {
  return (
    :
    <Component emitter={this.emitter} />
  )
}
```

```
// ChildA.js
constructor (props) {
  super(props)
  this.emitter = this.props.emitter

  this.emitter.addListener(
    'eventName', () => {
      // some code
    })
}
```

```
// ChildB.js
constructor (props) {
  super(props)
  this.emitter = this.props.emitter
}

someMethod() {
  this.emitter.emit('eventName')
}
```

1. ポイント1: 親でimport/instanceして、同じものを実際に使用する子コンポーネントに渡してあげる必要がある。
2. ポイント2: Listenerを増やすときは、addListenerは複数付ける。EventEmitter側でonメソッドを使用した際も、jQueryのonみたく1個のメソッド内で複数のEvent登録はできなかった。

## まとめ
EventEmitterで発行購読パターンみたいな実装ができた。今回はこれでリクエスト時のローディングアニメーションの管理をしてみたんだけどいい感じ。他にも使えそう。
