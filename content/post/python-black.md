+++
title = "Pythonのフォーマッタblackを使い始めたらだいぶ楽になった"
description = "Pythonのフォーマッタblackを使い始めたらだいぶ楽になった"
date = 2019-10-13T14:25:52+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Python"]
+++


Linterよりもフォーマッタ派になりました。  
JS書いてた頃はESLint+Prettierだったんですが、Pythonを書くときにもフォーマットしてくれるやつがほしいなーと思っていたところ、先日の[Python Kansai #01](https://kansai-python.connpass.com/event/135610/)で、[イクラ（@ikura1）](https://twitter.com/ikura1)さんがフォーマッタの[black](https://github.com/psf/black)の話をされていました。

<script async class="speakerdeck-embed" data-id="aa6c7c2a13d64114905f721d26cb331e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[Python Kansaiで「Blackはいいぞ」っていうLTしてきた - ikura1's log](https://ikura-lab.hatenablog.com/entry/2019/07/15/021656)

少し前から「blackはいいぞ」「blackはいいぞ」ってめっちゃ言われていたんですが、実際使い始めたら結構良かったので導入とかエディタ(VSCode)の設定を覚書。

## 導入

```
$ pip install black
```

終わり。  
設定ファイルは必要ないので入れたらその瞬間からいい感じ使えます。

``$ black FILE_NAME.py`` とか ``$ black DIR_NAME`` って叩くと対象ファイルやディレクトリ内のファイルに対してフォーマットをかけてくれます。

## VSCodeでの設定

毎度コマンドを叩くのはめんどくさいです。  
VSCodeで保存時に自動でフォーマットをかけてくれるように設定します。
設定するのは以下。

* PythonのPATH
* フォーマットのプロバイダとして black を指定
* 保存時にフォーマットするように指定 (貼付け時にも走るとうるさいので保存時だけ)

設定ファイルに落とし込むとこんな感じ。

```
{
  "python.pythonPath": "venv/bin/python3",
  "python.formatting.provider": "black",
  "editor.formatOnSave": true
}
```

※フォーマット時のプロバイダ設定を行うために、Pythonの拡張が必要だったと思います。  
[Python - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-python.python)


## メモ
これを使ってCIのworkflowの中に組み込んで、テスト・フォーマットをやった上でデプロイするって誰か言ってた気がする。


## 思うこと
色々こだわりがある人には思うところはあるんだろうなとは思いますが、Blackで整えられたものも割と見やすいしいいなって思います。
Flake8でやっていたこともあるんですけど、変に時間使っていたし、さっと入れていい感じにフォーマットしてくれるのでこれでいいかなって思いました。
