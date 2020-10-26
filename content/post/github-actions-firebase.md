+++
title = "Github ActionsでFirebase(Hosting)へのデプロイを行うところまでやってみた"
description = "この間Firebaseに全乗っかりなWebアプリを作ったんだけど、いい機会なのでGithub Actionsでビルドしてデプロイするところまでやってみたいなと思ったのでやってみた備忘録"
date = 2020-10-27T08:04:29+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Firebase", "Github Actions"]
+++



## はじめに
create-react-app でReactアプリを作り、Firebaseでのアプリ作成まで実施済みで、Github ActionsでFirebaseへのデプロイをするところまでの備忘録。

ちなみにパッケージマネージャは yarn を使っていて、 package.json では、以下のスクリプトを用意している状態。

```
{
    "scripts": {
        "build": "react-scripts build",
        "deploy": "firebase deploy",
    }
}
```

この他にLintかけてたりもするんだけど、その辺りは省略。

## Github Actions の設定ファイルを作成

リポジトリのページのActionsタブから、「New workflow」で作成。  
いくつかテンプレートが用意されているので、ここからNode.jsのものを選んで進めた。テンプレートから作成できるのありがたい。

作成時点で、

ブランチの指定と最低限のジョブの指定(OSの指定からNode.jsのバージョン、依存パッケージのインストールやビルドの実行など)がされているので、ここに書き足していく形で進んだ。

### 依存パッケージ部分の書き換え

yarn を使っているので、 ``npm ci`` 部分を ``yarn --frozen-lockfile`` yarn.lock の更新をかけないようにするため ``--frozen-lockfile`` を付けている。

```
- name: Install node_modules
  run: yarn --frozen-lockfile
```

### Firebase へのデプロイを実施

firebase-tools を入れておく

```
$ yarn add -D firebase-tools
```

[GitHub ActionsでFirebaseにデプロイする - きり丸の日記](https://nainaistar.hatenablog.com/entry/2020/05/26/Github_Actions%E3%81%A7Firebase%E3%82%92%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4%E3%81%99%E3%82%8B)

ほとんどこの記事の通りなんだけど、  
CLIでログインコマンドを叩いてブラウザからログイン、CLI上に表示されたトークンをGithubのリポジトリでSecretsに追加。  

デプロイ用のジョブを追加。

```
- name: deploy to Firebase Hosting
    run: |
    yarn deploy --token=${{ secrets.FIREBASE_TOKEN }}
```

あとはイベントに応じてやってくれるようになる

### キャッシュ改善

何もキャッシュしていない状態だと ``yarn install`` にかなり時間を取られて (2ms) それはちょっとってなったのでキャッシュさせることに。

* [依存関係をキャッシュしてワークフローのスピードを上げる - GitHub Docs](https://docs.github.com/ja/free-pro-team@latest/actions/guides/caching-dependencies-to-speed-up-workflows)
* [GitHub Actions でキャッシュを使った高速化 - 生産性向上ブログ](https://www.kaizenprogrammer.com/entry/2019/12/15/220137#%E3%82%AD%E3%83%BC%E3%81%AE%E3%83%9E%E3%83%83%E3%83%81%E3%83%B3%E3%82%B0%E9%A0%86%E5%BA%8F)


キャッシュの保存先を定義するときにIDを付けておく

```
- name: Get yarn cache directory path
    id: yarn-cache
    run: echo "::set-output name=dir::$(yarn cache dir)"

- name: Cache node_modules
  uses: actions/cache@v2
  env:
    cache-name: cache-node-modules
    project-name: project-name
  with:
    path: ${{ steps.yarn-cache.outputs.dir }}
    key: ${{ runner.OS }}-${{ env.project-name }}-${{ hashFiles('**/yarn.lock') }}
    restore-keys: |
        ${{ runner.OS }}-${{ env.project-name }}-${{ env.cache-node-modules }}
        ${{ runner.OS }}-

- name: Install node_modules
    if: steps.yarn-cache.outputs.cache-hit != 'true'
    run: yarn --frozen-lockfile
```

``with.path`` で上で定義したpathを指定すること。またIDを付けておくことでキャッシュヒットしたか確認する際にたどりやすくなる。

これで結果的にキャッシュが効いている間はキャッシュからの呼び出しになるのでインストールしない分、数sくらいで処理が終わるようになった。

### イベント発火タイミングを調整

PRのマージのタイミングだけデプロイしたら良いんだけど、マージのイベントは無いらしいので、以下の記事を参考にPRのクローズイベントとPRがマージされていることを条件に設定。

[GitHub Actions でプルリクのマージでワークフローを実行する - Qiita](https://qiita.com/okazy/items/7ab46f2c20ec341a2836)

ブランチの指定箇所に ``types: [closed]`` をつけること、  
jobs の上の方で、ブランチの状態確認を挟むことで対応。

```
if: github.event.pull_request.merged == true
```

## やってみて

先駆者の記事参考にしつつ結構さっと組めたし感謝。  

これまでCircleCIでやってたんだけど、この雰囲気で進められるなら CircleCIから移行してみてもいいかなー
