+++
title = "DockerでWordPressの環境を立ち上げる(簡易)"
description = "Dockerを使ってWordPressの環境を作ってみようと思ったので、実際にトライしてみた"
categories = ["クリエイティブ"]
tags = ["Docker", "WordPress"]
image = "images/common/docker.png"
date = 2017-09-28T13:31:41+09:00
author = "Daisuke Konishi"
+++


WordPress環境を作りたかっただけなので、Wockerの方が便利だったのですが、勉強も兼ねてちょっとだけやってみました。

## Dockerイメージを用意する
用意するコンテナは以下

- [wordpress](https://hub.docker.com/_/wordpress/)
- [mysql](https://hub.docker.com/_/mysql/)

以下のコマンドでダウンロードできます。  
最新版がダウンロードされるので、必要に応じて適宜バージョン指定してください。

```
$ docker pull wordpress
$ docker pull mysql
```

## 各コンテナを起動してみる
WordPressのコンテナ起動時にMySQLに接続するので、先にMySQLを起動します。

### MySQL

```
$ docker run -it --link some-mysql:mysql --rm mysql sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'
```

### WordPress

```
$ docker run --name some-wordpress --link some-mysql:mysql -d wordpress
```

起動しているかは、 ``$ docker ps`` で確認できます。

起動できていれば ``localhost:8080`` にアクセスするとWordPressのインストール画面が表示されるはずです。

## docker composeでまとめて起動できるようにする
一個一個コマンドを入れるのも面倒なので、設定ファイルを書いておいて、同時に起動できるようにします。

```
version: '3'
services:
  mysite_db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: password
  mysite:
    image: wordpress
    environment:
      WORDPRESS_DB_PASSWORD: password
      WORDPRESS_DB_USER: root
      WORDPRESS_DB_HOST: mysite_db:3306
      WORDPRESS_DB_NAME: mysite
    ports:
      - "8080:80"
    links:
      - mysite_db
```

こっちの方が見やすくていいです。

environmentでMySQLのパスワードなんかも設定できるみたいです。