+++
title = "Macで使うデフォルトのshellをfishに変更した"
description = "これまでデフォルトshellをzshにしていたのですが、急な思いつきでfishに変えたので変更にあたり何をしたのかを覚え書き"
categories = ["クリエイティブ"]
tags = ["fish"]
date = 2018-01-01T00:57:53+09:00
author = "Daisuke Konishi"
+++

実は昨年12月中に変えていたのですが、書くのを忘れていたなと思って書き初め。

## 経緯
結論から言えばノリです。

これまでデフォルトのシェルは、補完が強くて便利って話を聞いて[zsh](http://www.zsh.org/)を使っていた。
[prezto](https://github.com/sorin-ionescu/prezto)でテーマを当てたり設定加えて色々書いていたんだけど、カスタマイズを色々いじっていくのがめんどくさいのと、ちょっと重い気がしてた。

そんな中、会社で一緒に働いてる人がfishを使っていて(というか僕以外全員)、ちょっと触ってみたら**補完の感じが好きだった**ので変えてみた。

あと、ちょうど回ってきたこの記事を読んでやってみようと思った。  
[zshからfishにして1年が経ちました](http://deepblue-will.hatenablog.com/entry/fish)

> ## fishの良いところ
> - 協力な補完機能
>     - 履歴からはもちろん、manページを解析してオプションとかの候補も出してくれる！
> - シンタックスハイライト
> - 使えないコマンドは赤く表示される！
> - 起動が早い(zshと比べて)
> - カラフルできれい

色は別にいいんだけど、オプションの補完が割といい気がする。

> ## fishの悪いところ
> fish使ってて困ったことは以下の1点のみです
>
> その他のShellと構文が違うので、スクリプトのコピペでコマンドを実行できないことがある

前導入しようとして挫折したのはこれ。
各種自分で通したPATHとかを修正しないといけなかったり、新たに追加するときに調整しないといけない。

## Macへのfishの導入

bashやzshとは違って、fish自体は最初から入ってないのでHomebrewでインストールする。

```
$ brew install fish
```

```
# 変更
$ chsh -s /usr/local/bin/fish

# 確認
$ echo $SHELL
/usr/local/bin/fish
```

この時点で補完も出来るようになってるし、結構便利な状態。

### もっと便利にするプラグインを入れる
fishをもっと便利に扱うためにプラグインを導入する。その上で管理に便利な[fisherman](https://github.com/fisherman/fisherman)というプラグインマネージャーを入れる。  
oh-my-fishっていうツールもあったんだけど、こっちでテーマも管理できるのでこっちでやる方が楽。

```
$ curl -Lo ~/.config/fish/functions/fisher.fish --create-dirs https://git.io/fisher
```

fisherコマンドが使えるようになる。詳しい使い方は[README](https://github.com/fisherman/fisherman/blob/master/README.md)を参照。

#### とりあえず入れたプラグイン
fish プラグイン名 でインストールできる。

- [fisherman/docker-completion](https://github.com/fisherman/docker-completion)  
Dockerコマンドの補完を強化
- [fisherman/z](https://github.com/fisherman/z)
指定のディレクトリに一気に移動できる。ディレクトリ名だけ覚えてて、パスを覚えてないときとか便利かも
- [fisherman/fzf](https://github.com/fisherman/fzf)
補完をかけるときに候補を並べてくれて、ファイル検索や実行コマンド検索ができるようになる。

promptのテーマは、ここから選ぶことができる。
[oh-my-fish/oh-my-fish / docs/Themes.md - github](https://github.com/oh-my-fish/oh-my-fish/blob/master/docs/Themes.md)

色々みたんだけど、シンプルなのがいいなと思ったので、zshのときも使っていた、[pure](https://github.com/rafaelrinaldi/pure)にした。

ちなみに、promptの設定は、``~/.config/fish/functions/fish_prompt.fish``に書くと読み込んでくれる。

#### 設定ファイルの作成
特にいじらなくても十分使えるけど、ちょっとカスタマイズしたり、各種ツールのPATHを通したりするのに設定ファイルを書くことができる。

``~/.config/fish/config.fish``を用意して、ここに記述すると反映してくれる。

aliasなんかのファイルを分けておいて、config.fishにPATHを書くと読み込んでくれるらしい

```
. ~/.config/fish/env.fish
. ~/.config/fish/aliases.fish
. ~/.config/fish/Keybinds.fish
```

下記追記内の質問でも触れられているため、ぜひ参考にしてください。

## 追記: bash の記法をfishで使えるようにする
Twitterで、「teratail で質問されてませんかー」なメッセージを頂いたので、念の為追記です。

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="ja" dir="ltr"><a href="https://twitter.com/skd_nw?ref_src=twsrc%5Etfw">@skd_nw</a> こんにちは。teratailで「bashの記法をfishでつかえるようにしたい」という質問（ <a href="https://t.co/JVnvij9bB3">https://t.co/JVnvij9bB3</a> ）を偶然発見したのですが、これは skd_nw さんが投稿されたものでしょうか？　bassというfishプラグインがありまして、これを使用すれば解決できる可能性があります。</p>&mdash; 君継 葭月 (@JiaYue) <a href="https://twitter.com/JiaYue/status/1088049755102404608?ref_src=twsrc%5Etfw">January 23, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

質問はこちら。
[bashの記法をfishでつかえるようにしたい。 - teratail](https://teratail.com/questions/161596)

折角教えていただいたのですが、残念ながら質問したのは僕ではなかったので、サービスの方で対応方法の回答を書き込んでいただきました。気になる方は一度上記質問を覗いてみてください。

[Bass  Make Bash utilities usable in Fish shell - github](https://github.com/edc/bass)

## まとめ

- zshよりも簡単にいい環境を作ることができる
- 補完はめっちゃつよい
- fishermanを入れると色んな便利ツールが入れられる
- PATHの書き方なんかが変わるのだけネック

zshでゴリゴリカスタマイズしてないならこっちの方が楽