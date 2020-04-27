+++
title = "Hugoのテーマをgitのsubmoduleで管理し始めた"
description = "このブログはHugoで作成していますが、テーマをsubmoduleとして取り込む方法を使い始めたのでそのメモ"
categories = ["クリエイティブ"]
tags = ["Hugo", "git"]
date = 2018-02-12T00:23:51+09:00
image="/images/common/hugo.jpg"
author = "Daisuke Konishi"
+++


## はじめに
このブログはHugoで生成しているのですが、テーマはブログのリポジトリと別で管理しています。

これまでは、ブログのリポジトリの theme/ ディレクトリにzipとかで落としてきて展開していました。  
ですが、テーマのアップデート時に再度その作業を行うのは面倒だなと思い調べていた所、gitのsubmodule機能を使うことで、テーマのリポジトリをブログのリポジトリに取り込むことが出来る。つまり該当のテーマの所へ行けばgit pullできる。

> git submodule は、外部の git リポジトリを、自分の git リポジトリのサブディレクトリとして登録し、特定の commit を参照する仕組みです。

[Git submodule の基礎 - Qiita](https://qiita.com/sotarok/items/0d525e568a6088f6f6bb)

[Hugoの公式](https://github.com/gohugoio/hugoThemes)でもやってるテーマの管理方法ですね

## submoduleで取り込む
とりあえず、今の状態はこんな感じ。

```
.
├── README.md
├── archetypes
├── config.toml
├── content
├── layouts
├── public
├── static
└── themes
       ├── beautifulhugo
       └── hugo-gentoo-theme
```

beautifulhugoが初めた頃から使ってたテーマで、今回追加したいのは、申請中の [minimage](https://github.com/d-kusk/minimage) というテーマ。


## 新規ファイルをsubmodule化してみる
コマンドは簡単です。

```
$ git submodule add https://github.com/d-kusk/minimage minimage
```

すると、themes/ と .gitsubmodule で差分が発生している状態になるのでコミットする。
これでサブモジュールとして登録できました。

Hugoの特性上 themes/ 内のファイルはpullで上書きして、変更があるものは layouts の中にコピーして触るという事になっているのですが、更新工程がだいぶ楽になるんじゃないかなって思いました。

### 既存のファイルをsubmoduleに変える
一方、既にあるhugo-gentoo-themeをサブモジュール化するとき、ちょっと大変でした。

```
$ git rm -r hugo-gentoo-theme // 一旦git管理から外す

$ git submodule add -f https://github.com/d-kusk/hugo-gentoo-theme hugo-gentoo-theme
```

既にgit管理されてしまっているからだと思いますが、submodule addでは通らなかったので、helpで出てきた--fourceオプションを追加することでsubmoduleとして追加できました。

[git で、すでに管理していたファイルをサブモジュール管理に切り替えたい - neulog](http://neulog.tumblr.com/post/41175123388/git-%E3%81%A7%E3%81%99%E3%81%A7%E3%81%AB%E7%AE%A1%E7%90%86%E3%81%97%E3%81%A6%E3%81%84%E3%81%9F%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E3%82%B5%E3%83%96%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E7%AE%A1%E7%90%86%E3%81%AB%E5%88%87%E3%82%8A%E6%9B%BF%E3%81%88%E3%81%9F%E3%81%84)

※一応master以外の別ブランチで作業する方がいいと思うんですが、masterに切り替えるときにちょっと怪しかったので慎重にやってください。

### submoduleの更新
以下のコマンドを見かけたのでやってみたのですが反応が無く。

```
$ git submodule update
```

最終的に親のリポジトリで以下を実行することで更新できました。  
foreachを使うことで、全てのsubmoduleでgit pullを行うことになります。

```
$ git submodule foreach git pull
```

実行すると、親リポジトリで差分が発生するので、それをコミットする事で反映できました。

ちょっと理解しきらず使ってる所があるので不安があるけど、少しずつ使っていって理解したい。
