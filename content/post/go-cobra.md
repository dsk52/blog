+++
title = "Goでcobraを使ってスクリプトを組んでみた"
description = "GoでCLIから叩けるスクリプトを作ってみたいなと思ったので、cobraを使って作ってみました"
date = 2021-07-04T23:43:03+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Go"]
+++


GoでCLIから叩けるスクリプトを作ってみたいなと思ったので、cobraを使って作ってみました。

最近なかなか時間を確保できなくて echo さわるのもとまっていたので、休憩とちょっとした勉強がてらcobraに乗っかりつつ、 [Punk API](https://punkapi.com/) にリクエストを送るようなスクリプトを書いてみました。

## 環境

- Go 1.15
- spf13/cobra v1.1.3

## Punk API

[PUNK APIでクラフトビールの情報を取得しながらAPI利用を学ぶ🍻](https://zenn.dev/n0bisuke/articles/02-punkapi-node-api-learn)  
ここから。

ビール情報を引っ張れるAPIで、結構シンプルなので遊びに使わせてもらうには良さそうだなーって感じでした。  
CLIとして置いといて、ビール飲みたいよなーと思った時におもむろにコマンド叩いて取れたら面白そうじゃないっていう。冷蔵庫に在庫があるかはともかく。

## 作る

[spf13/cobra: A Commander for modern Go CLI interactions](https://github.com/spf13/cobra)

### 雛形からルートコマンドの生成

雛形が生成できるようだったのでやりました

```
$ cobra init --pkg-name punkcli

$ tree
├── LICENSE
├── cmd
│   └── root.go
├── go.mod
├── go.sum
└── main.go
```

main.go にはコマンドを呼び出す部分だけ記載があって、あとは cmn/root.go の中に。

今回はPunk APIのランダムに1件取り出すAPIをお借りしたので、サブコマンドを作る形で作ってみました。

### サブコマンドを生成

```
$ cobra add random
```

cmd/random.go が生成されて、この中でルートコマンドへの追加を行う (ここが最初分からなかった)

``` go
var randomCmd = &cobra.Command{
	Use:   "random",
    // 中略
	Run: func(cmd *cobra.Command, args []string) {
		res := random()
        // 以下略
	},
}

func init() {
    // ここで上で定義したコマンドをサブコマンドとしてルートコマンドに追加してる
	rootCmd.AddCommand(randomCmd)
}
```

あとは、いくつかの記事を参考にリクエストして、標準出力まで持っていった感じです。

- [Goでhttpリクエストを送信する方法 - Qiita](https://qiita.com/taizo/items/c397dbfed7215969b0a5)
- [[Go言語] JSONをパースする [json.Unmarshal][encoding/json]](https://noumenon-th.net/programming/2019/09/06/json-unmarshal/)

JSONのパースが型の関係でちょっとだけ詰まった。

## 今後

1. フラグで追加動作をさせるような感じに調整したい
2. テスト書いておきたい
3. ドキュメントが生成できるらしいので試す


### フラグで追加動作をさせるような感じに調整したい

現状叩くと通信して結果を標準出力するだけなんだけど、JSONファイルで吐けるとなにかに使えるかなーと思うのでそれをやっておきたい。



### テスト書いておきたい

書捨てっぽいところはあるんだけど、良い機会なので書いておきたいのと、ちょくちょく良さそうな記事が出てくるので読んでテスト書いておきたい。

- [Go言語でテストしやすいコマンドラインツールをつくる | Taichi Nakashima](https://deeeet.com/writing/2014/12/18/golang-cli-test/)
- [Cobra でテストしやすい CLI を構成する](https://zenn.dev/spiegel/articles/20201018-cli-with-cobra-and-golang)



### ドキュメントが生成できるらしいので試す

[ドキュメント生成の機能](https://github.com/spf13/cobra/blob/master/doc/README.md#documentation-generation)も載ってるらしい。イケメンすぎんか

main内で出力方法を記載しておくと、Markdownで生成できたりするらしい。


## やってみて
雛形生成できたり必要なものが大体揃ってるか同じ作者の人が別で用意してくれてたりとか充実した環境そうな印象でした。
[Goでコマンドラインツールを作るときの鉄板ライブラリ - Qiita](https://qiita.com/nasum/items/f1911894802a2b92dc9e)

標準ライブラリにもCLIを作るためのパッケージがあるようで、それだけでも十分っていう話は聞くので、そっちはまた時間作って触りたいかな。

仕事ではバッチ処理や大きめのデータ収集なんかにPHPでスクリプトを書いてたりするんですが、こういうところをGoでいい感じに処理できたら嬉しいようなーと妄想してます。
