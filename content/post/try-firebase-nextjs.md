+++
title = "ReactとFirebaseの構成でチャットシステムを目指した"
description = "前回Next.jsでルーティングを触ったので、今回はそれにFirebaseを組み合わせて昔なつかしのチャットルームを作ることをちょっとだけ目指した"
categories = ["クリエイティブ"]
tags = ["React", "Next.js", "Firebase"]
date = 2017-11-13T00:36:16+09:00
author = "Daisuke Konishi"
+++


この間Next.jsの話がチラッと聞こえたので、使うぞーってなっても0からスタートで困るみたいなことにならないようにサンプル作るかと思って触ってみた。

作ったものは一応[ここ](d-kusk/nextChat: try firebase and next.js : https://github.com/d-kusk/nextChat)に。

Firebaseは色々機能があって、認証とかリアルタイムデータベースあたりのことをよく聞きますが、今回は後者が気になるなーと思ったのでここです。

今回参考にしたのは以下。  
[React & Firebaseで簡単なChatアプリを作ってみた - Qiita](https://qiita.com/kazushikawamura/items/58ea222b3cc289882d79#component%E3%81%AE%E4%BD%9C%E6%88%90)


## 写経で進めた
とりあえず、吐き出された認証用のコードと先人のアイデアにありがたさを覚えつつ触っていきました。  
Reactのリハビリ(多分4回目数ヶ月ぶり)も兼ねてだったので写経で。

これまで作ったものだと、子コンポーネントに見た目とロジックが入っていてそれをまとめる親コンポーネントがいて、それがどこに描画するのかを書くって感じ。  
今回参考にしたコードでは、**子コンポーネントはあくまで見た目、ロジックはまとめている親コンポーネント側で定義する**というスタイルを取っていて、考え方になるほどなってなりました。

> これらは表示用のComponent(Presentational Component)なので、onClickやonChangeなどのイベント処理はpropsとして受けとり、Containerで実装します。

Firebaseから提供されるコードだと、HTMLにAPIKeyとかのコードを直接書き込むことになって気持ち悪いなーと思ってた。なにやらIP使ってホワイトリストで制限かける方法もあるらしいですが。  
で、とりあえずその方法は分からないので、せめてgithubに上げるときにキーが乗らないような構成にしたいなと思ってその辺も調べてました。

…参考にしたやつに載ってたんですけどね。

ES modulesを使う方法で、Firebaseが生成した設定部分を変数宣言し、それをimportかけるだけでした。
ただ、サンプルの通りにやっていると複数回 ``initializeApp()`` が走るみたいで、そのときに以下のようなエラーが出ました。

```
Firebase: Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
```

調べてみると、github のコメントでその話をしている人がいたので参考にしました。

[Firebase App named '[DEFAULT]' already exists (app/duplicate-app) - zeit/next.js issue](https://github.com/zeit/next.js/issues/1999#issuecomment-326805233)

参考にした記事だとdatabaseの設定も ``initializeApp()`` の箇所で行っていたんですが、既にAppが定義されていた場合の方が走ったときに変数の辻褄を合わせることができないため削除。必要な箇所で設定する方式に変更しました。今回だとデータの取得や更新をかけている親コンポーネントの箇所です。


## 権限問題
コードも書き終わったしチェックと思ってボタンを押していると、Permission denidのエラーが出ました。  
Firebase側でのデータを触れる権限を入れる必要があるらしく、このあたりの設定は今回のプロジェクト用に作ったアプリに入った後、Databese > ルールから設定できました。  
とりあえず以下にするとデータへの読み書きが可能になります。

```json
{
  "rules": {
    ".read": true,
    ".write": true,
  }
}
```

ただ、これだとキーとか知ってたらアクセスできてしまうので、ここでIPなのかUUIDみたいなものなんかで照合するのかな。この辺はもう少し調べる必要がありそうです。

## あとがき
プログラムとか置いてるディレクトリ内にFirebaseを触ったあとがあったんだけど、全く見に覚えがなかった。

あと、一応Next使ってるから下層にチャットができるところとしてページを作った。
チャットルームっていうネーミングにしたんだけど懐かしさを感じて爆発したのは内緒だ。
