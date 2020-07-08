+++
title = "anyenvとfish環境にgoenvを入れてGoの環境を作った"
description = "Goで開発できるようにgoenvを使ってfishで設定を行ったのでそのメモ"
date = 2020-07-09T07:25:57+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["go", "fish"]
+++


Goで開発できるようにgoenvを使ってfishで設定を行ったのでそのメモ。

[syndbg/goenv: Like pyenv and rbenv, but for Go.](https://github.com/syndbg/goenv)

fish と anyenv を使っているので、ここに goenv を入れる形で構築しました。  
goenv は Go のバージョン管理システムで、pyenv を元に作られてるらしいんですが、確かに使い方なんかは似てるなと思いました。

```
$ goenv -v
goenv 2.0.0beta11
```

## goenv のインストール
anyenv に追加。

```
$ anyenv install goenv
```

## PATHを通す

Github に[zsh用の設定](https://github.com/syndbg/goenv/blob/master/INSTALL.md#basic-github-checkout)があったんですが、Qiitaにもう少し良さそうなものがあったのでこっちを使ってみました。

```
$ vim ~/.config/fish/config.fish
```

```
set -x GOENV_ROOT "$HOME/.anyenv/envs/goenv"
set -x PATH "$GOENV_ROOT/bin" $PATH
set -x GOROOT (goenv prefix)
set -x GOPATH $HOME/go/(goenv versions --bare)
set -x PATH "$GOPATH/bin" $PATH
eval (goenv init - | source)
```

[anyenvを使うためのfishの設定ファイルの例 - Qiita](https://qiita.com/fuppi/items/512928cd009b5c153a5e)

このタイミングだと go が入ってないのでエラーを吐きましたが、記事通り go のインストールを行ったら出なくなりました。

## go のインストール

```
$ goenv install -l
  :
  1.13.11
  1.13.12
  1.14.0
  1.14beta1
  1.14rc1
  1.14.1
  1.14.2
  1.14.3
  1.14.4
  1.15beta1

$ goenv local 1.14.4
$ go version
go version go1.14.4 darwin/amd64
```

とりあえずプロジェクト以下のみ設定してます。

これでインストールできたので、ツールとかAPIとか作っていこうかなと思ってます。
