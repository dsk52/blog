+++
title = "DockerでLaravelの実行環境を作ったので覚書"
description = "そろそろLaravelの勉強をする必要が出てきそうだったので、DockerでLaravelを動かす環境を作ってみた"
date = 2020-01-03T04:34:49+09:00
image = "images/common/docker.png"
categories = ["クリエイティブ"]
tags = ["Docker", "Laravel", "PHP"]
+++

そろそろ Laravel の勉強をする必要が出てきそうだったので、Docker で Laravel を動かす環境を作ってみた。

環境のファイルはここに置いている  
[d-kusk/docker-laravel - github](https://github.com/d-kusk/docker-laravel)

## 環境

-   Docker 19.03.5
-   docker-compose 1.24.1
-   NGINX 1.16.0
-   PHP(php-fpm) 7.4.1
-   MySQL 8.0.18

とりあえず Laravel-Mix 用の Node.js コンテナは置いといて、その他の Laravel の起動に要するコンテナだけ用意してみた。

## 構成

```
├── docker/
│   ├── mysql/
│   │       └── Dockerfile
│   ├── nginx/
│   │       ├── Dockerfile
│   │       └── default.conf
│   └── php/
│           ├── Dockerfile
│           └── php.ini
├── docker-compose.yml
└── src/  # Laravelのプロジェクトディレクトリが入る
```

~~Docker の環境とソースコードは別にしていて、最終的に別ディレクトリにあるソースコードをシンボリックリンクで src/ 内に置けるようにする想定。~~

nginx がシンボリックリンクを辿ってくれなくてずっと 404 だったので、一旦諦めて src/ 内にソースコードを置くように変更した。  
[disable_symlinks off; を入れる](https://unix.stackexchange.com/questions/157022/make-nginx-follow-symlinks)みたいな話もあったけど、そもそもデフォルトで off らしいので違うみたい。また、開発環境の想定だからいいんだけど、シンボリックリンクを参照するのは脆弱性あるらしいので念の為やめた。

## PHP のインストールをメモ程度

今回構築する上でのキモは PHP だと思っていて、特に Dockerfile の調整が骨が折れた。  
[docker/php/Dockerfile - d-kusk/docker-laravel](https://github.com/d-kusk/docker-laravel/blob/master/docker/php/Dockerfile)

折角なので PHP(PHP-FPM) は 7.4 系を使いたくて、それの alpine ベースのイメージを Docker Hub から持ってくる形で進めた。OS 自体は軽いみたいだけどパッケージとか拡張モジュール入れていくと誤差ではって気がしてしまう…。

あと、Composer は別コンテナで作るって話がよく見かけるけど、PHP 関連の操作って考えると同じとこに合った方が考えやすいような気がして PHP のコンテナに含めてみた。

## やってみて

ちゃんと理解出来てないんだけど、パッケージ+拡張モジュールな形で色々インストールしないといけなくて、どれがどれと対応してるのかちょっと分かりづらいとこが辛い。(多分要らないもの入ってる。ここが一番時間かかってしまう。)

## 今後

Laravel-Mix を使えるように Node.js のコンテナを用意したいのと、キャッシュ用に memcache か Redis のコンテナをつなげるようにしたい。

あと、zip の拡張モジュールが入れられていないのでそこの対応が必要かな。

## その他参考にしたもの

-   [nginx - Docker Hub](https://hub.docker.com/_/nginx)
-   [php - Docker Hub](https://hub.docker.com/_/php)
-   [mysql - Docker Hub](https://hub.docker.com/_/mysql)
-   [Docker を使って Laravel 開発環境構築 - Qiita](https://qiita.com/A-Kira/items/1c55ef689c0f91420e81)
-   [Laravel+MySQL+Nginx でさくっと Docker 開発立ち上げる - Qiita](https://qiita.com/wakanayoshizawa/items/67bd9e74d7805516e68d)
