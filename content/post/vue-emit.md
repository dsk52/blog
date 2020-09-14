+++
title = "Vue.jsでカスタムイベントを設定し、子から親コンポーネントにイベントを渡す"
description = "最近Vue.jsを触る機会があって、がちゃがちゃ触ってるんですが最近子から親コンポーネントへのイベントを使った値渡しですごくハマって解決したので覚書。"
date = 2020-09-15T00:10:55+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["JavaScript", "Vue.js"]
+++


最近Vue.jsを触る機会があって、がちゃがちゃ触ってるんですが最近子から親コンポーネントへのイベントを使った値渡しですごくハマって解決したので覚書。


## やりたかったこと

子コンポーネントで選んだものを親コンポーネントに通知してアクションを起こす。

## 環境

- Vue.js v2.6.12

## ハマったこと
公式ドキュメントや数件の記事で、子コンポーネントから ``$emit`` を使って発行し、親コンポーネントで ``$on`` で購読するというのがあったのでその方法を行っていたんだけど、購読処理の方がなかなかできなかった。

イベントが発行できているかは、[Vue Devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)をChromeに入れてみたところ、子コンポーネントからイベントが発行できていることが確認できた。


## どう対処したか

子から親への通知なので、カスタムイベントを設定し、そのイベントで選んだものの値を親に渡す。  
[カスタムイベント — Vue.js](https://jp.vuejs.org/v2/guide/components-custom-events.html)


ChildComponent

```vue
<template>
<div>
    <div class="child" @click="clickElement(1)"></div>
    <div class="child" @click="clickElement(2)"></div>
    <div class="child" @click="clickElement(3)"></div>
</div>
</template>

<script>
import ChildComponent './components/ChildComponent';

export default {
    methods: {
        clickElement: function(param) {
            this.$emit('myevent', param)
        }
    }
}
</script>
```

ChildComponent側でイベントを発行するものをいくつか設定しておく。
これをクリックした際に ``clickElement`` が実行されて ``myevent`` が発行される。


ParentComponent

```vue
<template>
<div>
    <div class="parent">
        <child-component @myevent="listenEvent"></child-component>
    </div>
</div>
</template>

<script>
import ChildComponent './components/ChildComponent';

export default {
    components: {
        'child-component': ChildComponent
    },

    methods: {
        listenEvent: function(param) {
            alert(param)
        }
    }
}
</script>
```

ParentComponentでイベントを待ち受ける必要があるんだけど、いくつかの記事で以下の記事が出てきた

1. created や mounted で ``this.$on(EVENT_NAME)`` を書いておく
2. 親コンポーネントのテンプレート上部 (template直下の div )あたりで @EVENT_NAME を設定
 
僕がやった実装だとどちらもうまく動かず、上記 ParentComponent のように **親コンポーネントで呼び出している子コンポーネントにリスナーをセット** して値を受け取れることが確認できた。


ただ、この方法は1階層上(親)へのイベント発行になるので、更に上に返そうと思うと更に上に発行するか、EventHub, EventBus を使うことになるみたい。

そこまで複雑な形でコンポーネントは作ってないけど、このあたりはもう少し理解しておきたいかな
