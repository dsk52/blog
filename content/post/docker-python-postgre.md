+++
title = "DockerでPython3(Django)の環境を作る(PostgreSQLの接続もする)"
description = "DockerでPythonとPostgreSQLの環境を作って開発をすすめる方法について"
categories = ["クリエイティブ"]
tags = ["Python", "Django", "Docker", "PostgreSQL"]
image = "images/common/docker.png"
date = 2017-12-04T19:48:13+09:00
author = "Daisuke Konishi"
+++


## はじめに
以前まで[Python3のvenvを使って環境を作って進めていた](/post/python-pyvenv.html)んだけど、最近DBの勉強も始めて、DBの環境を作るのにDockerを使ってる。どうせならPython側もDockerにしちゃってよくない？と思ったのでまとめてDockerに載せてみた。

### 環境

- Docker v17.09.0-ce
- Python v3.6.3
- PostgreSQL v10

## 追記(2019.07.28)
プロジェクトを追加して docker-compose up したらいいところまでもっていったものを作ってgithubに公開しました。
pythonのバージョンなど記事のモノより少しアップデートしています。  
https://github.com/d-kusk/docker-python-postgresql


## 環境を作っていく
実はこの方法は、[Djangoのドキュメント](https://docs.docker.com/compose/django/)に書いてあった。

流れとしては以下のようになる。

1. DockerfileでPythonの環境を構築する設定を作る
2. PostgreSQLのイメージを落とす
3. docker-composeでまとめて起動できるようにする

### 1.DockerfileでPython3の環境を構築する設定を作る
Pythonの環境はDockerfileで作成する。というのも、イメージを落としてきた後で ``requirements.txt`` を読み込むなどの処理をしたいから。

ちなみにDockerイメージはDocker Hubにある[Officialイメージ](https://hub.docker.com/_/python/)を使っている。  
Dockerfileの書き方もそのままにしている。細かいバージョンの指定をした方がいいと思うけど、とりあえず保留。  
このファイルでは、PythonイメージのPullとディレクトリの作成とルートディレクトリ化、pipによるパッケージのインストールを行っている。

```Dockerfile
FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
```

### 2. PostgreSQLのイメージを落とす
PostgreSQLのDockerイメージはDocker Hubにある[Officialイメージ](https://hub.docker.com/_/postgres/)を使っている。

```shell
$ docker pull postgres
```

### 3. docker-composeでまとめて起動できるようにする
docker-compose の設定ファイルはほとんど Docker Hub のリポジトリで掲載されているものと同じだけど、追加で PostgreSQL のデータを永続化する設定を入れている(多分これで出来てるんじゃないかなぁ)

```yaml
version: '3.1'

services:
    web:
        build: .
        command: python3 manage.py runserver 0.0.0.0:8000
        volumes:
            - .:/code
        ports:
            - "8000:8000"
        depends_on:
            - db
    db:
        image: postgres:10
        environment:
            POSTGRES_DB: "database"
            POSTGRES_USER: "postgres"
            POSTGRES_PASSWORD: "postgres"
        volumes:
            - ~/docker/postgres:/var/lib/postgresql/data
```

Docker の環境としてはこれで接続できているはずなので、Python で接続する設定なんかを書いていけばいい気がする。  
db の方で書いた environment の情報をもとに Django の設定をして使っている。(POSTGRES_USERなんかはあくまでローカル環境ということでこの値で設定している)

### ちなみに: DjangoでPostgreSQLに接続するなら
DjangoでPostgreSQLに接続するときは、1つ前のセクションで書いたように **データベース名やUSER名なんかはdocker-compose の environment で設定しているもの** を入力する。 **Hostはdb、Portが5432** を設定すると接続できた。

モジュールとしては **psycopg2** が必要。インストールから設定なんかの詳しい部分は以下を参考にした。  
<a href="https://qiita.com/shigechioyo/items/9b5a03ceead6e5ec87ec#django%E3%81%AE%E8%A8%AD%E5%AE%9A%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B" target="_blank">DjangoにPostgreSQLを適用する - Qiita</a>

## 使っていて困ったことと対処法
### ログが確認できない
Docker無しでやっていた頃は、ターミナルでローカルサーバーを立ち上げてそこに表示されるエラーを見ていた。Docekrでやるようになって、``docker-compose up / start`` で立ち上げると実行中のエラーログなんかがそのままでは表示されず確認ができない。

単純だった。Dockerコンテナ内ではログが出ているので、以下のコマンドを使うことでログを見ることができた。

```shell
$ docker logs -t コンテナ名
```

また ``-f`` をつけることで、tailコマンドのようにずっとログを表示してくれるようになる。

### python manage.py migrate とかってどうやるのか
別のターミナルを開くなりして、以下のコマンドでコンテナに入り、任意のコマンドを打つことでmigrateなどのコマンドも使えた。

```shell
$ docker exec -it コンテナ名(ID) bash
```

入らなくても使う方法があった気がするけど、なんとなくこっちの方が安心なのでこっちを使っている。

## 最後に
今回のやり方ってPythonに限らず他の言語でも使える方法な気がするので構造は覚えておきたい。
