+++
title = "Ubuntu 20.04 + AMD Ryzenな環境でHDMI出力をできるようにする"
description = "先日ThinkPad T14 Gen1 (AMD Ryzen) + Ubuntu20.04な環境に乗り換えたらHDMIを始めいくつかハード面のトラブルに見舞われてなんとか対処したのでその方法について"
date = 2020-11-23T14:54:13+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Linux"]
+++



## はじめに

最近、使用していたMacのスペック不足が気になってきて、新マシンに乗り換えました。その際ThinkPad T14 Gen1 (AMD Ryzen) + Ubuntu 20.04 に変えたのですが、起動してみてとりあえず以下の問題がありました。

* スピーカーが認識されない
    - 音量を調整するキーを押すとダミー出力の文字
* HDMIを繋いでも外部ディスプレイを認識しない
    - ディスプレイを検出するキーも反応が無い
    - 出力をするドライバーを調べてもブランクな状態

## 結論
先に結論。
mainline を使ってKernelをアップデートしました。

[bkw777/mainline: A continuation of the free version of ukuu.](https://github.com/bkw777/mainline)

Kernelのバージョンは、Ubuntuインストール時の 5.4.53 から情報の出てきた 5.8.18 (現在の 5.8系の最新版)まで上げたところ、スピーカーもHDMIの問題も解消しました。

## 調べたこととか参照先

いくつか見ていたんですが、Ubuntu 20.04で同じ症状を抱えた人の書き込みが数件あって、その中でRedditに全く同じマシンで対応した人がいたのでそこを参考にしました。

[Thinkpad T14 gen 1 ryzen 4750u ubuntu compatibility : linuxhardware](https://www.reddit.com/r/linuxhardware/comments/imc4o4/thinkpad_t14_gen_1_ryzen_4750u_ubuntu/)

ただ、ここが少し引っかかりポイントでした。

回答の中でKernelを 5.8 に上げたらいいよ というものがありました。

> Update to 5.8 kernel

これを元に使えるバージョンを調べるべく、以下のコマンドを叩いていました。

```
$ sudo apt-cache search linux-image-5.
```

リストで出てくる 5.8 が5.8.0のものしかなく、全て試すもHDMIどころかWiFiも使えない状態になりました。

どうやってもだめで対応待つかーと諦めかけていたとき、上で書いた mainline というカーネルをGUIで設定できるツールがチラついてきて、気になったので入れてみたところ、上のコマンドで出てこなかったバージョンも出るようになりここで 5.8.18 を入れることができました。
5.9系もあったんですが上げまくってもちょっと怖いかなと思ったので一旦5.8の最新止めです。

結果的にこれによってHDMIでの出力も、スピーカーの問題も解消しました。

## まとめ

Kernelのアップデートで解消することができました。
あと、副産物的なものとして、GRUBの触り方とか[カーネルのインストールから、どうやってバージョンを切り替えられるようにするか](https://codechacha.com/ja/ubuntu-update-kerenl/)なんかもしれてそれはそれで良かったです。

※今回の対応はサポート外な気がするので、自己責任で実行してください。
