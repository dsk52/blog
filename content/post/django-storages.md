+++
title = "django-storagesでGoogle Cloud Storageから静的ファイルの配信をできるようにする"
description = "django-storages を使って Google Cloud Storage から静的ファイルの配信をできるようにしたのでそのときにやったことを備忘録として残します"
date = 2019-06-15T14:23:44+09:00
image = "images/common/django.png"
categories = ["クリエイティブ"]
tags = ["Django", "GCP"]
+++


先日 Django で作っていた Web アプリを heroku にアップする機会があったんですが、その際に静的ファイル(CSS, JS, 画像、フォントとか)の配信を考える機会がありました。

Django の場合、 [Whitenoise](http://whitenoise.evans.io/en/stable/index.html) というライブラリを用いるのが多いのかなと思います。  
Whitenoise を使うとローカルにある静的ファイルの配信ができるようになりますが、ユーザーからアップロードされる画像なんかでは問題が発生します。  

※例えば heroku でホスティングしている場合、デプロイを行うごとに別のインスタンスに切り替わるらしく、ユーザーからアップされた画像は置いてけぼりになるようです。そのため永続化のために外部のストレージを使う必要が出てくる。

そのため今回は django-storages を用いて Google Cloud Storage から静的ファイルを配信するようにして、CSS, JSファイルの読み込み、画像の表示を確認するところまでやります。

[django-rest-frameworkのレスポンスにS3上のファイルパスを含める方法](https://blog.daisukekonishi.com/post/django-drf-storages/)を別記事で書きました

## 環境

- Django 2.2
- django-storages 1.7.1
- (Pillow 6.0.0)  ファイルのアップ用

## 前提

- GCPのアカウントは取得済み
- Djangoでプロジェクトの作成とAppの登録が終わっている


## 設定
基本的にはここのページをもとに設定します  
[Google Cloud Storage — django-storages 1.7.1 documentation](https://django-storages.readthedocs.io/en/latest/backends/gcloud.html)


```
$ pip install django-storages[google]
```

### 設定: GCP側

1. サービスアカウントを作成 (IAMと管理 > サービスアカウント > サービス アカウントの作成)  
作成を進めると認証用の鍵がダウンロードされる ( your-project-XXXXX.json )
2. Google Cloud Storageでバケットを作成
3. 作ったサービスアカウントからバケットにアクセスできるようにしておく

### 設定: Django側

1. Djangoのプロジェクト内に鍵ファイルを配置し、アクセスできるようにしておく。
2. ``project_name/settings.py`` に ``GOOGLE_APPLICATION_CREDENTIALS`` をはじめ設定を記述。

参考サイト見ながらこんな感じにした

```
from google.oauth2 import service_account

GS_CREDENTIALS = service_account.Credentials.from_service_account_file(
    # 鍵ファイルのPATHを設定
    os.path.join(BASE_DIR, 'AUTH_KEY.json'),
)
DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
GS_BUCKET_NAME = 'バケット名'
GS_PROJECT_ID = 'プロジェクトのID'
STATIC_URL = 'https://storage.googleapis.com/バケット名/'
```

#### 設定: テンプレート側
``STATIC_URL`` で Storage の URL を設定できているので ``{% static %}`` でいけました。

```
<head>
  {% load static %}
  <link rel="stylesheet" href="{% static 'css/style.css' %}" />
  <script defer src="{% static 'js/script.js' %}"></script>
</head>
```

画像に関しては、 Pillow の ImageField で保存していた場合、DB に画像のファイルパスが保存されるんですが、テンプレートで使う際は以下のように書いたらいけました。.url がポイント。

```
<img src="{% static '画像のファイルパス.url' %}">
```

ブラウザの開発者ツールなんかから確認して、ファイルパスが Google Cloud Storage のものになっていればOKです。

## 静的ファイルの収集と Google Cloud Storage へのアップ
以下のコマンドを叩くと、 ``app/static/`` から静的ファイルが収集されて、 Google Cloud Storage へのアップが行われます。

```
$ python manage.py collectstatic
```


## やってみて
結構めんどくさいんだろうなーと思ったけど、ライブラリのおかげでだいぶサクッとできて結構驚いた。AWSのS3とか他のストレージサービスにも対応してるらしいのでまた機会あったら使ってみようかな。
