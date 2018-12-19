+++
title = "DjangoのAppをプロジェクトルート以外に配置する"
description = "Djangoでコマンドを使って生成するAppを別のディレクトリにまとめることができたのでそのやり方について"
categories = ["クリエイティブ"]
tags = ["Python", "Django"]
image = "images/common/django.png"
date = 2017-11-27T23:15:26+09:00
author = "Daisuke Konishi"
+++


DjangoでWebアプリを作るときは、[Djangoチュートリアル](https://docs.djangoproject.com/ja/1.11/intro/tutorial01/)の構成を真似て App ごとに作るようにしている。
これまで、いくつか Project を作ってみるときも、この App をルートディレクトリに生成していた。するとこのような形になる。

```
/
├ AppA/
├ AppB/
├ AppC/
├ YOUR_PROJECT_DIR/
├ manage.py
└ requirements.txt
```

これだと App を作るたびにルートディレクトリが広がってしまい、ファイルを探しにくい。

そこで、ルートディレクトリに App をまとめるディレクトリを用意し、その中で管理する方法を聞いた。なのでその覚書。

## 環境

- Django v1.11

## App をまとめるディレクトリの作成とディレクトリ指定を追加

今回はルートディレクトリに App をまとめるディレクトリ ``apps/`` を作成。

App の配置ディレクトリを変更(追加)するため、 ``YOUR_PROJECT_DIR/settings.py`` に以下の記述を追加する。

``` YOUR_PROJECT_DIR/setting.py
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))
```

参考: [Python Tips：ライブラリ読み込み対象ディレクトリを追加したい](http://www.lifewithpython.com/2014/01/python-add-directories-to-path-to-import-libraries-from.html)

static ファイルの管理ディレクトリの指定なんかの近くに記述しておくといいのかも。

ちなみに、これを記述することにより **INSTALLED_APPS = [ ... ]** の記述はルートディレクトリに展開したときと同じでよくなる。urls.py についても同様のはず。

## 次回以降の App の生成はどうするのか

今回の設定により App を管理する位置が変わってしまったので、コマンドを叩くともとの階層に生成されるのでは？と思った。

ドキュメントを見てみると、コマンドの後ろにパスを指定することでそこに生成するって書いてあった。
[startapp - django-admin and manage.py](https://docs.djangoproject.com/en/1.11/ref/django-admin/#startapp)

ただ、パスを指定して生成しようとするとディレクトリが無いって言われたり、作ったら作ったで既にあるって言われるので、とりあえず App の雛形を生成して、 ``apps/`` の中に移動する形で対応している。