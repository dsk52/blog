+++
title = "Djangoで作ったシステムを1系から2系にバージョンアップした"
description = "1個Djangoで作ったアプリがあって、"
date = 2018-09-16T12:42:07+09:00
image = "images/common/django.png"
categories = ["クリエイティブ"]
tags = ["Django"]
+++

Django は今 v2.1.1 が使えるようになっていて、2系自体は[2017年の12月2日にリリースされている](https://docs.djangoproject.com/en/dev/releases/2.0/)みたいです。しばらく v1.11.7 を使っていたのですが、そろそろ上げてみようかなと思ったのでアップデート作業をしてみました。

## 前提
Django v1.11.7 -> v2.1.1のアップデートです。

## アップデート作業
アップデート自体は初体験でどうするんだろと思っていたんですが簡単で、仮想環境を立ち上げた状態で以下のコマンドを実行し、何か言われたら対応するって感じみたいです。

```
$ pip install -U Django
```

今回はこれだけでほぼすんなり終わりました。
ローカルサーバーを起動時に migrate が必要と言われたため、 migrate を行い動作チェックをして終了です。

```
$ python manage.py migrate
```

### 非推奨な記述のチェックと対応
ちなみに、アップデート時によくない書き方(非推奨とか)をしていたりすると動かなくなる可能性もあるみたいで、その辺りのチェックもしないといけません。  
以下のコマンドを使うことで、普段隠蔽されている警告なんかも出してくれるようになるみたいで、これをもとに修正を行いました。

```
$ python -Wd manage.py
```

ちなみに怒られたのは、 Model で設定していた Foreign Key の引数の記述でした。  
**Djangoの2.0から on_delete が必須になった** ようです。Foreign Keyで紐付いているものが削除される時にどうするかというもので、NULLにしたりデフォルトを設定したり、そもそも削除できなくすることができるみたいです。

on_delete の設定に関してはこちらの記事が分かりやすかったです。  
[Django、on_deleteを使う(django2.0から必須) - naritoブログ](https://torina.top/detail/297/)

[公式ドキュメント](https://docs.djangoproject.com/ja/2.1/ref/models/fields/#django.db.models.ForeignKey.on_delete)でもなんとなく分かるんですけどね…

### 参考
- [Djangoを1.11から2.0にバージョンアップ | ガネーシャ様のアンテナショップ](https://btj0.com/%E3%83%96%E3%83%AD%E3%82%B0/django/django%E3%82%921-11%E3%81%8B%E3%82%892-0%E3%81%AB%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E3%82%A2%E3%83%83%E3%83%97/)
- [Django 2.0リリース！ 最新のDjangoで作るカンバンボードアプリ ～ モデルの定義とDjango REST frameworkの実装](https://codezine.jp/article/detail/10722)


## おまけ: Docker環境のパッケージもアップデートする
[以前の記事](https://blog.daisukekonishi.com/post/docker-python-postgre/)で書いていましたが、今回アップデートした環境のローカル開発環境の方はDockerで作っていて、こちらのアップデートも行いました。

Pythonのコンテナは[Docker HubにあがっているOfficialなもの](https://hub.docker.com/_/python/)を使っています。
パッケージ類は pip と requirements.txt で管理しています。(この表現で正しいのかよく分からないけど…)

依存関係のこともあるので、 pip コマンドを使ってアップデートした後で requirements.txt を更新かけたいよなーと思っていました。
ですが、現状 docker-compose の起動時にサーバーを立ち上げるようにしていて、Django のアップデートをかけるとこれが停止してしまい、コンテナ自体も落ちてしまう問題がありました。まぁそうですよねー。

どうしようかなーと思ったんですが、もういいやと思って venv からパッケージの更新をかけて、 requirements.txt も更新。docker-compose でコンテナ作成時にパッケージのインストールを行うように変えました。

### コンテナの作り直し
パッケージのリストは更新できたものの、コンテナ内の環境で Django は以前のバージョンのままです。docker-compose で PostgreSQL のコンテナも管理していますが、 ``docker-compose up`` をしてしまうと、こちらも作り直されてしまい、中のデータもまっさらになってしまいます。入れ直しは面倒なので、Pythonのコンテナのみ作り直しを行います。

結論はこれ。

```
$ docker-compose up --force-recreate SERVICE_NAME
```

SERVICE_NAMEの箇所は ``docker-compose.yml`` で設定している service の名前を書きます。

これで無事Pythonのコンテナの方だけ作り直されて、こちらのDjangoもアップデートできました。

## やってみた
作ってるシステムがそんなに難しいものじゃないこととそんなに離れていないバージョンだったからか作業は少なくて済みました。
ただ、今後どうなるか分からないのでできるだけ細かくアップデートしていきたいですね…。