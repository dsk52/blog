+++
title = "create-react-appで作ったReactアプリをFirebase HostingにTravis CIでデプロイする"
description = "ReactAppをTravis経由でFirebaseへのデプロイを自動化しました。"
date = 2018-11-29T20:22:42+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["React", "Firebase", "Travis"]
+++


最近はGithub経由でNetlifyへのデプロイが多かったので、git push したら自動でビルドから公開までしてくれる超楽な感じだったんですが、Firebaseを触り始めてデプロイを自動化したくなったので、Travis CIでデプロイするところまでやりました。

ゴールは、**TravisでReactのビルドを行ったものをFirebase Hostingにデプロイする**までです。

## React App作成
いつものやつです。

```
$ create-react-app ReactProject

$ cd ReactProject
```

## プロジェクトにFirebaseの設定を行う
コンソール周りの話は飛ばします。コンソールで紐付けるプロジェクトを作成してください。

プロジェクトに対してFirebaseの設定を行うツールをインストールします。

```
$ npm i -g firebase-tools
```

インストールが終わったら、先程作ったプロジェクトのルートディレクトリで以下のコマンドを実行します。

```
$ firebase login
// ブラウザが開くのでアカウントを選択してログイン

$ firebase init
```

対話的に何をするかを聞かれるので、 **Hostingを選択** して流れに身を任せます。

今回Reactのビルドしたものをデプロイするので、 **公開するディレクトリをbuildにします** 。(何かしら設定を変えている場合は適宜設定してください。生成される firebase.json に設定が記載されるので後からここを変えても大丈夫です。)

完了すると、 ``.firebaserc`` と ``firebase.json`` が生成されます。

この状態で、以下のコマンドでビルドしたものをデプロイできるので、一度確認してみても良いかもしれません。

```
$ yarn run build
$ firebase deploy
```

## Travis CIで自動デプロイするようにする
``.travis.yml`` はこんな感じで作りました。

```
language: node_js

node_js:
  - "8.11.1"

install:
  - npm install -g firebase-tools
  - yarn install

script:
  - echo "========== Build Start =========="
  - yarn run build

branches:
  only:
    - master

cache: yarn

deploy:
  provider: firebase
  skip_cleanup: true
  token:
    secure: $FIREBASE_TOKEN
  project: $FIREBASE_PROJECT
```

cacheやbranchesを除いて上から順に実行されます。(記述順ではなく、分かりやすいように実行される順で並べています。)

``$FIREBASE_TOKEN`` (後述) や ``$FIREBASE_PROJECT`` はTravisのプロジェクト画面右上の 「Setting」 から環境変数を設定しています。(CUIでシリアライズとかいちいち面倒なので。)

Travisのドキュメントにdeployについては書いてあったのでそのまま貼ったのですが、deploy前にTravisがstashしてビルドしたものが消えてしまうため上手くデプロイできない問題がありました。  
その解決のため、deployの中に ``skip_cleanup: true``を入れています。

### $FIREBASE_TOKENの取得
CIからFirebaseを操作するために、トークンを取得しておきます。

```
$ firebase login:ci
```

しばらくするとブラウザが立ち上がるのでアカウントを選択してログイン。
ターミナル上にトークンが表示されるので、これをTravisの環境変数として設定します。

ここまで来るとデプロイできるハズなので、一度git pushなどでCIを起動してビルドからデプロイができることを確認してみましょう。


## 参考
[（初心者向け）Firebase HostingへReactプロジェクトを公開する手順 - Qiita](https://qiita.com/junara/items/74801923ca108b328b26)
