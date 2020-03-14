+++
title = "Dockerを思い出しながら、Elasticsearch+Kibanaの環境を作った"
description = "以前触ったタイミングからだいぶ時間が経ったので、使い方を思い出しながらDockerでElasticsearchとKibanaの環境を作ってみた"
categories = ["クリエイティブ"]
tags = ["Docker", "Elasticsearch", "Kibana"]
image = "images/common/docker.png"
date = "2017-09-10T16:10:06+09:00"
author = "Daisuke Konishi"
+++


最近バックエンドが関わるものをちょくちょく作る機会が出てきているのですが、MAMPやVagrantで一個一個環境をつくっていくのもちょっとしんどいし、Vagrantで作るのもちょっとしんどいなーって思ってきたので、Dockerの勉強をはじめました。

Dockerを触るのは2年ぶりくらいで、その頃はBoot2DockerがあまりよくないとかでCoreOSで立てていたのを覚えています。
また、最近は他にもいろんな良いツールが出ているという話を小耳に挟んでいたのでその辺で作っていこうと思いました。

## Docker環境の構築
ちょくちょく名前を聞いていた、Docker for Macを入れてみました。  
ダウンロードとインストールは[こちら]((https://store.docker.com/editions/community/docker-ce-desktop-mac))のサイトからいつもアプリを落としてる感じでダウンロードしてインストール作業を進めていくだけです。

<ins>
追記:
会社のマシンがEl Capitanだったのですが、インストール後、コマンドの入力で ``Warning: failed to get default registry endpoint from daemon`` といったエラーが出て上手くいかなかったのですが、以下の方法でいけました
[MacでDockerをインストールした後に必要な作業](https://qiita.com/butada/items/4044c5efd03341c8afef)
</ins>

バージョンはEdgeとStable(安定版)の2つがあり、最初Edgeを入れてみていたのですが、うまくいかなかったのでStableにしました。その方が今後も安全そうだしね…。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="und" dir="ltr"><a href="https://t.co/345hHeWpn6">pic.twitter.com/345hHeWpn6</a></p>&mdash; こにたん (@skd_nw) <a href="https://twitter.com/skd_nw/status/903471768219688960">2017年9月1日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Next押して固まった…</p>&mdash; こにたん (@skd_nw) <a href="https://twitter.com/skd_nw/status/903472169883115521">2017年9月1日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

インストールが完了すると、メニューバーにDockerのアイコン(クジラの上に四角がいっぱいなやつ)が表示されます。
この状態でdockerコマンドが使えるようになります。

導入の簡単さに驚きを隠せません。また、この状態で既にdocker-composeやkitematicが入ってるそうです。
後者は分からないですが、前者は複数コンテナの扱いが楽になるらしいので勉強しておきたい…。

## コマンドを思い出しながら、Elasticsearch + Kibanaの環境を作る

さて、Dockerの実行環境ができたので、ElasticsearchとKibanaの使える環境を作ります。

DockerはDockerfileからDockerイメージを作り、DockerイメージからDockerコンテナを作るというフローみたいなものが存在します。

Dockerfile -> Dockerイメージ -> Dockerコンテナ

Dockerfileでは既存のイメージをもとに更に処理を加えたりミドルウェアを追加したりして拡張することができるようです。
例えば、LinuxのディストリビューションであるDebianを読み込んで、更にnginxを追加するみたいな感じです。

作ったDockerfileは ``$ docker build `` でイメージにすることができます。

色々と処理を追加で書いていくことができますが、面倒なのとその辺りまで作ってあるイメージは大抵[Docker Hub](https://hub.docker.com/)というイメージ共有サービスで公開されています。

アカウントを作ると、自分で作ったイメージをアップしておいたり、お気に入りのイメージにStarをつけて応援かつブックマークしておくこともできます。

### Docker Hub からイメージを落としてきて使う
検索してみると、ちょうどいいイメージがありました。

[nshou/elasticsearch-kibana - Docker Hub](https://hub.docker.com/r/nshou/elasticsearch-kibana/)

このイメージを落としてくるときは、右上に書いてるDocker pull Commandを参考に、このように打つと pull することができます。

```
$ docker pull nshou/elasticsearch-kibana
```

しばらくすると pull が完了するので、あとはこのイメージをもとにコンテナを作ってブラウザで確認できるようにするだけです。

#### コンテナの作成と起動
以下のコマンドでコンテナの作成と起動ができます。
この辺はドキュメントの通りなので、うまく動かない場合はドキュメントを参照してください。

```
$ docker run -d -p 9200:9200 -p 5601:5601 nshou/elasticsearch-kibana
```

Full Description に使い方が書いてあるものが多いので助かります。

起動が終わったらそれぞれ確認します。

ブラウザでそれぞれ以下を叩くとダッシュボードが見れるはずです。

* Elasticsearch ``localhost:9200``
* Kibana ``localhost:5601``

#### コンテナを停止する
立ち上げたままだと気持ち悪いので、用事が終わったら落とします。

以下のコマンドでコンテナの状況を確認できます。

```
$ docker ps

$ docker ps -a  # バックグラウンドで立ち上がってるものまでみるならこれ
```

実際に停止するときは、上のコマンドで調べた情報から ``CONTAINER ID`` を控えておいて、以下のように叩きます。

```
$ docker stop CONTAINER ID
```

もう一度 ``$ docker ps`` コマンドで確認すると、 **STATUS のところが Exited になっている** のが確認できると思います。


## やってみて
Dockerのインストールもだいぶ簡単になったような気がします。
あと、やりたい事をすぐできそうなイメージがいくつもあるようになったのでDocker Hub最高です。

とりあえずこれでELKの環境はさくっと立ち上げられるようになったので、また設定やりつつちょこちょこ触っていけたらなって思います。
