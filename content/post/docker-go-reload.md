+++
title = "DockerでGo(echo)のライブリロード環境を作った"
description = "DockerでGoを使ってechoのライブリロード環境を作ったのでそのメモ"
date = 2021-01-17T22:15:29+09:00
image = "images/common/docker.png"
categories = ["クリエイティブ"]
tags = ["Docker", "Go"]
+++


前までは、ホスト環境にGoをインストールして、echoを試していたのですが、Dockerでやる場合の環境を作ってみようと思ってやってみました。

今回作る環境としては、echo の動作する環境としていますが、echo のインストールはコンテナ立ち上げ後に一度だけ実行する予定なので書いていません。なので、Ginなどの他のフレームワークでも使える方法なんじゃないかと。試してはいませんが。


## ディレクトリ構成
今回のプロジェクトのディレクトリ構成は以下です。

```
├── docker
│   ├── go
│          └── Dockerfile
├── docker-compose.yml
├── go.mod
├── go.sum
├── server.go
└── src
```

Go modules を使って依存管理をおこなっています。  
また、docker-compose.yml を用意しているのは、今後MySQLなどのDBコンテナを立ち上げる予定をしているからです。

## Goの環境を作る

docker/go/Dockerfile を用意します。

### Go単体の実行環境を用意する

```Dockerfile
FROM golang:1.15.6-alpine

WORKDIR $GOPATH/src

RUN apk update && \
    apk add --no-cache \
    alpine-sdk \
    git

ENV GO111MODULE=on  # 一応明示的に有効にしておく

```

alpineベースのGoのイメージを元に構築しました。

musl-devパッケージが必要になりがちらしいのですが、なんだかんだgccを始めビルド用のパッケージが必要になるんじゃないかなーと思っているので、 alpine-sdk でまとめて入れちゃいました。  
[alpine-sdk - Alpine Linux packages](https://pkgs.alpinelinux.org/package/edge/main/x86/alpine-sdk)


### docker-compose.yml でまとめて動かせるようにしておく
後々、MySQLやRedisのような外部コンテナとの連携もしていくかもしれないので、docker-compose の設定をしておきます。

```docker-compose.yml
version: '3'

services:
  app:
    build:
      context: .
      dockerfile: docker/go/Dockerfile
    tty: true
    volumes:
      - ./:/go/src
    command: go run server.go
    ports:
      - 8080:8080
```

これでGoのコンテナをビルドして、server.go を走らせるまでできるようになりました。

server.go の中身は、Echoのドキュメントそのままです。(port指定だけ変えてます)

```server.go
package main

import (
	"net/http"
	
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":8080"))
}
```

### Goの環境をライブリロード対応させる

ここまででGoのコンテナ起動時にサーバーが立ち上がるようになっていますが、コードを編集した際にコンテナ内の状態を更新してくれないので、ライブリロードさせるようにします。

※変更を検知してコンパイルしてくれる状態で、ブラウザの更新まではしません


ライブリロードの機能としては、 cosmtrek/air を使います。

[cosmtrek/air: ☁️ Live reload for Go apps](https://github.com/cosmtrek/air)

これをDockerfileに追記します。アプリケーションには不要なので、位置としては go modules を有効にする前。

```Dockerfile
:
RUN go get -u github.com/cosmtrek/air

ENV GO111MODULE=on  # 一応明示的に有効にしておく
```


これと .air.toml という設定ファイルが必要になります。  
[air_example.toml](https://github.com/cosmtrek/air/blob/master/air_example.toml)の内容をベースに、``cmd`` のファイルパスのみ修正しました。


あとは、docker-compose.yml のcommand部分のみ変更します。

```docker-compose.yml
    volumes:
      - ./:/go/src
    command: air
```

これによって、docker-composeでの起動時にairがgoファイルの変更を検知して自動でコンパイルをしてくれるようになりました。


## やってみて
airの導入は結構楽だったので助かりました。  
volumeの扱いやパッケージのインストールタイミングをどうするかの方が少し困ったくらいでした。
