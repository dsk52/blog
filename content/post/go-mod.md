+++
title = "go.modでGoのパッケージ管理を始める"
description = "最近は echo と gorm を触っているんだけど、Goでのパッケージ管理ってどうするのって事になってそれも合わせて触ってたので始め方とか。"
date = 2020-09-10T00:55:28+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["go"]
+++


前回の環境構築からかなり経ってるんだけど、少しずつGoを始めてる。
最近は echo と gorm を触っているんだけど、Goでのパッケージ管理ってどうするのって事になってそれも合わせて触ってたので始め方とか。


## 始め方

Goだと、 go.mod を使うっぽい。

```
$ go mod init PACKAGE_NAME
```

これで go.mod ファイルが作られる。

PACKAGE_NAME には github.com/USER_NAME/PACKAGE みたいな名前を使うことが多そう。  
どう公開するかだと思うのでそこはその都度考えたらいいと思う。

```
module PACKAGE_NAME

go 1.14
```

go のバージョンまで入ったので、地味にありがたい気がする。

プロジェクト初期から入れたほうがいいと思う。途中で入れた場合管理がしきれなそう。  
全ファイル確認して記載する方法ってあるんだろうか…


## パッケージ追加

```
$ go get PACKAGE_NAME
```

PACKAGE_NAME は、 github.com/labstack/echo みたいな形式で書く。

少し待つとダウンロードが実行されて go.mod に追記される。(go.sumも作られる)
パッケージ自体は、 GOPATH の下の方に入るみたい。  
僕の環境だとココに置かれてた。 ``/Users/USER_NAME/go/VERSION/bin/``

## 整理

go get で入れたけどプロジェクトでは、使わなくなったなっていうときはこれ。

```
$ go mod tidy 
```

go.mod 内を整理してくれる。
ただ、実体は置かれたままらしいので、ほんとに要らなくなったら直接消しに行かないといけないらしい。ほんとかな。


## おまけ

VSCode を調整してコードを書いてるんだけど、 languageServer に gopls を使ってみている。
[tools/user.md at master · golang/tools](https://github.com/golang/tools/blob/master/gopls/doc/user.md)

補完はいい感じ。あとこれがパッケージのAuto importをしてくれてるらしいんだけど、なかなかいい感じ。

自作パッケージがimportできたりできなかったりするのでそこはもう少し探らないといけない。
