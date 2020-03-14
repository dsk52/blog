+++
title = "alpineで作成したDockerコンテナ内で、ssh(鍵認証)を使えるようにする"
description = ""
date = 2020-03-14T22:30:09+09:00
image = "images/common/docker.png"
categories = ["クリエイティブ"]
tags = ["Docker"]
+++



この間作業していたプロジェクトが、中でSSHを使う必要があったんだけど、最近使っているalpineを使った環境では少し調整が必要だったのでその覚書。


## 結論

* openssh をインストール
* 鍵ファイルはマウントして使用する


## 調査時に出てきたもの
### SSHコマンドについて
そもそもsshを使うためのミドルウェアがインストールされていないようなので、 openssh をインストールする

[openssh - Alpine Linux packages](https://pkgs.alpinelinux.org/package/edge/main/x86_64/openssh)

### コンテナ内での鍵の扱いをどうするか

1. コンテナ内で作成
2. ホストマシンの鍵をマウント

1の方法については、鍵の作成後にコンテナ内の鍵を取得してGithubとかBitbacketみたいなサービス側で登録する必要がある。また、コンテナを作成する度に行う必要がある。

2の方法なら鍵は外から入れるので登録のし直しの必要はない。ただなんかモヤッとする。

ただ、いい方法も思いつかないので今回は2の方法で実施した。


## 実行できるようにする

### openssh をインストール

Dockerfile内

```
RUN apk install openssh
```


### 鍵ファイルはマウントして使用する

最近は docker-compose を使っているので、volumes のところでホストマシンの .ssh ごとマウントしてしまう。(configのこともあるので)

```
version 3.1

services:
  :
  hoge:
    volumes:
      - ~/.ssh:/root/.ssh
```

これでコンテナを作成後、コンテナを起動したらコンテナ内でsshを使えるようになる

## やってみて

alpine は軽量なだけあって色々入ってないんだけど、そもそも普通の用途ならこういうことしないから不要って考えなんだろうな。
初めてやったけどいい経験だったかもしれない。
