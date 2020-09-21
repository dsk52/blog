+++
title = "PythonでCloud StorageのイベントでSpeech APIを使って文字起こしするスクリプトを作ってみた"
description = "最近個人開発の同人誌みたいなものを読んでいて、GCP使ってる人多いなーと思ってたんですが、ふと Speech API(Voice to Text API)を触ってみたくなったのでそれを絡めたちょっとしたツールを作ってみました。"
date = 2020-09-21T12:39:08+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Python", "GCP"]
+++


最近個人開発の同人誌みたいなものを読んでいて、GCP使ってる人多いなーと思ってたんですが、ふと [Speech API(Speech-to-Text)](https://cloud.google.com/speech-to-text?hl=ja)を触ってみたくなったのでそれを絡めたちょっとしたツールを作ってみました。


できたものはここ  
[dsk52/voice2text](https://github.com/dsk52/voice2text)

Cloud Functions と Cloud Storage、 Speech APIを使っています。
 
仕組みとしては、 Cloud Storage に音声ファイルをアップロードすると、そのイベントを元に Cloud Functions から Speech API を使って文字起こしを行い、結果を Cloud Storage にアップロードするというものです。

```
音声ファイル(.wav)
 ↓
Cloud Storage
 ↓　　↑ 翻訳後ファイル(.txt)
Cloud Functions
 ↓　　↑
Speech API
```

## Cloud Functions でやったこと

### Speech API を叩く

ほとんどサンプルそのままです。

```py
from google.cloud import speech_v1p1beta1 as speech
```

speech_v1p1beta1 を import しているんですが、そもそもの speech だと非推奨なのか Cloud Functions 上でうまく動かず、上の形で import した後別名をあてました。


また、解析対象の音声ファイルの長さが長くなるとサンプル記載のメソッドでは解析に時間がかかりすぎたりできなかったりするらしく、 ``long_running_recognize()`` の方を使うことになりました。(返り値も異なりました)


### Storage操作

解析後のファイルをメモリに持つのは大きい可能性があったので、一度ファイルへ出力することに。  
ただ、Cloud Functions上でその場にファイルを置くと Read-Only になってしまうため、一時ディレクトリを作成しそのままアップロードすることにしました。(tmp以外はこうなるらしい)

初めて使ったのですが、標準ライブラリに tempfile というものがあり、これで一時ファイルを作ったり ``TemporaryDirectory()`` で tmp にファイルを作ってアップロードする処理をしています。また、 with で扱っているので処理が終わると自動で削除するというのもなかなかいいなと思いました。

[Python3で一時ディレクトリ(tmp/temp)を使う方法](https://cre8cre8.com/python/tempfile-temporarydirectory.htm)

Storage にファイルがアップロードされたことをトリガーにする方法については、デプロイ時にイベントを設定することになるようで、4つあるうちの ``google.storage.object.finalize`` になりました。  
これにより、バケットにオブジェクトが作成・上書きされるタイミングで発火するイベントに Function を紐付けることができました。  
また、Function 内に用意した関数に event 引数を割り当てておくと、バケット名やファイル名なんかを取得できます。
今回はこれを使って作成・更新されたファイルの名前を取得することにしました。

## 今後やりたいこと
ファイルのアップロードがGCPのコンソールからしかできないのでアップロード用の処理を作ってもいいかなーと思ってます。

あと、話者ダイアライゼーション(会話中のそれぞれの会話がどちらによるものかを自動予測)がベータで入っているらしいので、これを組み込んで解析後のテキストファイルに入れたいなーと思ってます。
