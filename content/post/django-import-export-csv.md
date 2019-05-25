+++
title = "django-import-exportで管理画面からCSVをインポートできるようにした"
description = "Djangoで開発を行っている際に、マスターデータが欲しくなりそれをCSVでインポートかけれたらいいなと思ったのでやってみました"
date = 2019-05-25T11:09:08+09:00
image = "images/common/django.png"
categories = ["クリエイティブ"]
tags = ["Django"]
+++


最近作っているもので、CSVでマスターデータを作って流し込みがしたくなりました。  
調べていると[django-import-export](https://kurozumi.github.io/django-import-export/) というライブラリがあったので試してみました。

## 環境

- Python v3.7.2
- Django v2.2
- django-import-export v1.2.0


## 最終的にこうなる

Djangoの管理画面に登録したモデル(?)の一覧ページと変更ページの右上にインポートとエクスポートのボタンが表示され、ここから進んだ先の画面でインポート/エクスポートできるようになります。ボタンがどこに表示されるのか分からなくてちょっと探したので自分のためにメモ。

![管理画面のデータの一覧画面右上にインポート・エクスポートのボタンが表示されている様子](/images/2019/django-import-export/buttons.png)

## やってみる
設定方法なんかは[入門のページ](https://kurozumi.github.io/django-import-export/getting_started.html)に載っていますが、自分のために書いておきます。

Projectファイルなど一部省略しますが、App内は以下のようなファイル構成の想定です。

```
app
├ :
├ models.py
├ admin.py
└ adminResources.py
```

流れはこんな感じ。

1. モデルの定義
2. データの用意
3. リソースを定義
4. 管理画面への登録
5. 管理画面から確認


### モデルの定義
モデルを定義しておきます。

app/models.py

```python
from django.db import models


class Food(models.Model):
    name = models.CharField('名前', max_length=128)

    class Meta:
        db_table = 'food'
        verbose_name = '食べ物'
        verbose_name_plural = '食べ物一覧'

    def __str__(self):
        return(self.name)
```

### データの用意
Excelやスプレッドシートでデータを用意。今回はスプレッドシートでこんな感じにデータを用意しました。

![スプレッドシートでデータを用意](/images/2019/django-import-export/sheet.png)

パッと思いついたのが男子高校生みたいなラインナップで我ながら笑った

今回必要なのかなと思って id 列も作ってしまいましたが、id は AUTO INCREMENT な処理があるため上手くインポートできなくなります。  
後述しますが、**インポート対象から任意の列を除外することも可能** です。

用意できたらCSVでエクスポートしておきます。

### リソースを定義

app/adminResources.py

``` python
from import_export import resources

from .models import Food


class FoodResource(resources.ModelResource):

    class Meta:
        model = Food
        skip_unchanged = True
        report_skipped = False
        exclude = ('id',)
        import_id_fields = ('name', )
```

ココが今回のキモです。

``import_fields`` と ``import_id_fields`` があるけど、id部分を上手く加算してくれる ``import_id_fields`` がオススメ。  
このプロパティにCSV内のデータにあるものの中からインポート対象の列を指定する。

また、id 部分は ``exclude()`` にidを指定して除外しておく。( import_id_fields があるからもしかしたら要らないかも。)

さらに、CSVインポートで運用していくと二回目以降に重複したデータを入れることになりかねないんだけど、 ``skip_unchanged = True`` を入れておくことで、**重複箇所で変更の無いものはスキップしつつインポートをかけてくれる**ようになる。

### 管理画面への登録

app/admin.py

``` python
from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .adminsResources import FoodResource
from .models import Food


@admin.register(Food)
class FoodAdmin(ImportExportModelAdmin):
    resource_class = FoodResource
```

定義したリソースクラスを管理画面で使えるようにするため admin.py で紐づける。

## やってみて
一応これで管理画面に「最終的にこうなる」で表示したようなボタンが表示されているはず。

インポート自体は少し遅いけど、そもそもCSVで入れられるようになった事とファイルを選択した後で変更分の差分表示をしてくれるのはありがたいなと思います。
