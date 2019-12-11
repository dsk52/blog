+++
title = "django-rest-frameworkでS3上のファイルのURLを返す"
description = "Djangoを使ってCloudStorage上のファイルのパスを返す方法は試しましたが、Django REST Frameworkを使ってファイルのパスを返すことを試してみました"
date = 2019-12-11T00:39:43+09:00
image = "images/common/django.png"
categories = ["クリエイティブ"]
tags = ["Python", "Django", "S3"]
draft=true
+++


※この記事は **[Django Advent Calendar 2019](https://qiita.com/advent-calendar/2019/django) 12日目の記事** です。

HTMLのレスポンス形式で、[Cloud Storage上のファイルのURLを載せて返す方法](https://blog.daisukekonishi.com/post/django-storages/)は既に書きました。  
django-storages の設定をした後、DetailViewなどでデータを返しurlフィルタなんかでPATHを表示させればうまく表示できるって感じでした。

django-rest-framework(以下DRF)だとどうなるのかというのが気になったので、AWSのS3のPATHをJSONレスポンスに含める方法を試しました。

やってみたソースコードは以下にあります。  
[d-kusk/drf-storage - github](https://github.com/d-kusk/drf-storage)

## 環境
- Python 3.7.2
- Django 2.2.7
- djangorestframework 3.10.3
- django-storages 1.8
- boto3 1.10.32
- Pillow 6.2.1

## ディレクトリ構成

```
.
├── config  // Project dir
├── entry
├── manage.py
├── requirements.txt
├── :
└── venv
```

## Djangoの準備
DjangoでプロジェクトとDRFのインストールや初期設定は終えている前提で進めます。

S3とのやり取りを行うために以下のパッケージをインストール。

```
$ source venv/bin/activate.fish  // 適宜変えてください

$ pip install boto3 django-storages Pillow
```

config/setting.py には以下を設定。ドキュメントに載っていた必須項目をベースに+アルファみたいな感じ。

```
# django-storages
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# AWS
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = os.environ.get('AWS_S3_REGION_NAME')
AWS_DEFAULT_ACL = os.environ.get('AWS_DEFAULT_ACL', 'public-read')
AWS_LOCATION = 'static' # s3バケット上のベースとなるファイルパス

# STATIC_URL = '/static/'
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
STATIC_URL = 'https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
```


## S3の設定
バケットの作成と準備。
[ドキュメント](https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html)を参考に進めていく。

IAMユーザーを作ってバケットに紐づけておく。(ここは割愛)

プライバシーポリシーはドキュメントに有った以下を使用。

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObjectAcl",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject",
                "s3:PutObjectAcl"
            ],
            "Resource": [
                "arn:aws:s3:::example-bucket-name/*",
                "arn:aws:s3:::example-bucket-name"
            ]
        }
    ]
}
```

これを行った上で、一旦S3にあがるか確認。

```
$ ./manage.py collectstatic
```

実行が終わると、S3のバケット上に static ディレクトリが作成され、中にCSSやJSのファイルが作成されているはず。

## Entry アプリの作成と画像のアップロード

カスタムユーザーモデルでプロフィール画像を設定しようと思ったんですが、ちょっと面倒だなってなってしまったのでサクッと試しやすいEntryアプリを作りました。雑なブログみたいなイメージ。

```
$ ./manage.py startapp entry
```

config/settings.py

```
:
INSTALLED_APPS = [
    :
    'rest_framework',
    'entry',
]
:
```


以下のようにモデルを作成し、 thumbnail に画像の情報を持つ想定。

entry/models.py

```
from django.db import models

class Entry(models.Model):
    title = models.CharField('タイトル', max_length=128)
    content = models.TextField('本文')
    thumbnail = models.ImageField('サムネイル', null=True)

    class Meta:
        db_table = 'entry'
        verbose_name = '記事'
        verbose_name_plural = '記事一覧'

    def __str__(self):
        return(self.title)
```

あとはこれに ViewSet と Serializer を作成。

entry/ViewSet.py
```
from rest_framework import viewsets
from .Serializer import EntrySerializer
from .models import Entry

class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
```

entry/Serializer.py
```
from rest_framework import serializers
from .models import Entry

class EntrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Entry
        fields = ['title', 'content', 'thumbnail']

```

便宜上管理画面に項目を追加しておく。

entry/admin.py

```
from django.contrib import admin
from .models import Entry

@admin.register(Entry)
class EntryAdmin(admin.ModelAdmin):
    pass
```

## URLの紐付け

APIとしてアクセスできるように urls.py で設定をしておく。

config/urls.py

```
:
from rest_framework import routers

from entry.ViewSet import EntryViewSet

router = routers.DefaultRouter()
router.register(r'api/entry', EntryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
]
```

## 確認
管理画面からデータを入れておく。

![管理画面からデータを入力](/images/2019/django-drf-storage/input.png "管理画面からデータを入力")

ブラウザから ``api-auth/`` にアクセス。
DRFのプレビューができる機能にアクセスできるので、その後上で紐付けた api/entry にアクセスすると EntryViewSet 経由で処理が行われてこんな感じのレスポンスが返ってくるのが確認できます。

![レスポンス確認](/images/2019/django-drf-storage/response_check.png "レスポンス確認")

DBから取得したデータ(画像のPATHを保存しているみたいです)から django-storages で S3 から取得。取得したデータを EntrySerializer でまとめているイメージですかね。

## やってみて
やっぱライブラリがいい感じにやってくれるなーって思いました。
自分で取得してまとめる方法もあるみたいですが、そっちは試せていないのでまた今度。
