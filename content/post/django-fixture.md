+++
title = "Djangoでfixtureを使って初期データを投入する"
description = "Djangoでfixtureを使ってテスト環境用のデータを投入する"
date = 2018-07-29T15:47:47+09:00
image = "images/common/django.png"
categories = ["クリエイティブ"]
tags = ["Python", "Django"]
+++

この間テストを書くときに ``ModelName.objects.create()`` でデータを作っていましたが、後々見つけたfixtureを触ってみたのでそれについて。

前の記事: [DjangoでTestCaseを使ってテストを書いた · PengNote](https://blog.daisukekonishi.com/post/django-test/)

今回はテストデータではなく、テスト環境で使うデータの投入。
ProjectやAppの作成、登録は終わっている状態。

## 環境など

- Python v3.6.5
- Django v2.0.7

## ディレクトリ構造
最終的なディレクトリ構造です。

```
/
├── db.sqlite3
├── manage.py
├── App
│   ├── apps.py
│   ├── fixtures
│   │   └── fixture.json
│   ├── models.py
│   └── views.py
└── ProjectDir
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```

## Moddelの作成とfixtureの準備
### Modelの作成
Modelは仮でこんな感じで ``app/models.py`` に記述。

```
from django.db import models


class Person(models.Model):
    name = models.CharField('名前', max_length=128)

    def __str__(self):
        return self.name
```

### fixtureの作成
``App/fixtures/fixture.json`` を作成。  
上で作成したModelに対してfixtureを作っていくのでこんな感じ。

```
[
  {
    "model": "App.Person",
    "pk": 1,
    "fields": {
      "name": "山田太郎",
    }
  },
  {
    "model": "App.Person",
    "pk": 2,
    "fields": {
      "name": "田中二郎",
    }
  }
]
```

他のテーブルが絡んだときどう書くかがまだ分かってないんだけど、単体ならこんな感じになりました。

## データを投入する
``fixtures/initial_data.json`` とかって作っておくと、 ``./manage.py migrate`` で毎回入れてくれるっていう話を見かけたのですが、上手くいかず…
暫定的にもう1つの以下の方法でとりあえず入れています。
migrate での入れ方が分かったら追記しようかな。

```
$ ./manage.py loaddata App/fixtures/fixture.json
```

テストの ``SetUp()`` で指定する方法もあるらしいので、今度試してみます。

## 参考
[Djangoでfixtureを使う - Qiita](https://qiita.com/zakuro9715/items/f650c087e82c01ed8366)


## おまけ
データが入っているかの確認は、[DBeaver](https://dbeaver.io/)を使うのが楽でした。  
MySQLやPostgreSQL、SQLiteなどなど色々対応しているらしく、ER図生成してくれるのも便利です。