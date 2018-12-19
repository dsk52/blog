+++
title = "Djangoの管理画面にあるデータ一覧の表示をカスタマイズする"
description = "Djangoで作っているアプリで、管理画面を作っているのですが、管理画面で管理するデータの表示をカスタマイズしたいなと思い調べたので備忘録"
date = 2018-04-13T02:07:33+09:00
image = "images/common/django.png"
categories = ["クリエイティブ"]
tags = ["Django", "admin"]
draft = false
+++

少し前からちょこちょこDjangoを触っていますが、管理画面の調整を行っていて、管理画面に表示する内容を変更したいなと思っていました。今回ようやく重い腰をあげて調べ、対応できたので備忘録です。

## 環境
- Django v1.11.7


## 管理画面へのモデルの追加
管理画面でデータを扱うために、扱うデータ用のモデルを追加します。

```
from django.contrib import admin
from .models import HogeModel

admin.site.register(HogeModel)
```

最初は複数登録していたので、リストにモデル名を追加して ``admin.site.register()`` に追加していました。

## 一覧の表示項目を変更する
``admin.ModelAdmin`` を使った class を作成し、 list_display に表示するモデルのプロパティを追加することでカスタマイズする事ができました。
また、設定したclassとモデルを紐付けるために、**第1引数にモデル、第2引数にaddminモデルを指定**します。

```
from django.contrib import admin
from .models import HogeModel

class HogeModelAdmin(admin.ModelAdmin):
    list_display = ('PropertyA', 'PropertyB')


admin.site.register(HogeModel, HogeModelAdmin)
```

- [Djangoで管理サイトを作成する | CodeLab](https://codelab.website/django-admin/)
- [はじめての Django アプリ作成、その 7 | Django documentation | Django](https://docs.djangoproject.com/ja/1.10/intro/tutorial07/)

今回は単にプロパティを指定して該当するデータを表示するようにしましたが、メソッドを指定することもできるようです。カテゴリの一覧なんかで件数拾って表示したりも出来るのかな。  
もう少し触ってみようと思います。