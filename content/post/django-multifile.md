+++
tags = ["Python","Django"]
categories = ["クリエイティブ"]
description = ""
title = "Djangoで処理を別のファイルに分けてimportさせる"
author = "Daisuke Konishi"
date = "2017-07-19T09:41:58+09:00"
image = "images/common/django.png"
+++

## はじめに
最近[DjangoGirlsTutorial](https://www.gitbook.com/book/djangogirlsjapan/workshop_tutorialjp/details)も終わったので、Djangoでアプリを作りかけてる。また、API叩いてごにょごにょみたいなやつ。

Djangoでは、機能ごとにアプリを作ってその中で開発を進めていくっぽい。
アプリはコマンドで雛形を作ってくれるのでありがたい。楽。

最近やってるのは、以下の環境

- Python v3.6.0
- Django v1.11

## 外部ファイルのimport
処理を書いていく中で、もとからある ``views.py`` とか ``models.py`` にゴリゴリ書くとファイルが膨らむし読みにくいので、外部ファイル化してみた。  
この時のimportの仕方というかパスの記述がよく分からなくて詰まった。

参考: [Djangoでモジュールを複数ファイルで構成する - Qiita](http://qiita.com/RyoMa_0923/items/c4ca5bd070e823403fdf#model%E3%82%92%E8%A4%87%E6%95%B0%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E5%88%86%E5%89%B2)

まず分けるファイル( ``models.py`` )を消してその名前のディレクトリ ``models/`` を作る。  
その中に ``__init__.py`` を作って import の記述を追加。これが ``models/`` のコアみたいなものになるらしい。  

また、importする際のパスの記述はアプリを基準に書いた。

```
├── manage.py
├── project/
│   ├── __init__.py
│
├── app/
│   ├── __init__.py
│   ├── _models.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   ├── models/
│   │   ├── __init__.py
│   │   └── ClassFile.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
```

``app/models/__init__.py`` に以下

```
from app.models.ClassFile import ClassName

def func():
  ClassName()
```

viewでも同じことができるみたい。
import周りはまだちゃんと理解できてないからもう少しちゃんとドキュメント読もう
