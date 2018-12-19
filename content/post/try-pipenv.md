+++
title = "pipenvでDjangoの環境を作る"
description = "pipenvでDjangoの開発環境を作ってみたのでその所感"
date = 2018-06-19T01:17:17+09:00
image = "images/common/django.png"
categories = ["クリエイティブ"]
tags = ["Python", "Django"]
+++



## pipenv
[GitHub - pypa/pipenv: Python Development Workflow for Humans.](https://github.com/pypa/pipenv)

pip と virtualenv を一緒に扱えるとか、パッケージをPipfileとそのlockファイルで管理できるとか、パッケージの脆弱性チェックできるとかその他色々便利になるっぽい。

まだその辺で辛くなるまで使えてないんだけど触っておこうと思ってちょこっと触ってみた。

## pipenvをインストールする
Macを使ってるので、Macの方法。  
Homebrewでインストールできた。

```
$ brew install pipenv

$ pipenv --version
pipenv, version 2018.05.18
```

## 環境を作る
```
$ pipenv --python 3.6

$ pipenv shell // 仮想環境の有効化
$ pipenv install django==2.0.6
$ pipenv install --dev flake8 // 開発環境のみ使うもののインストール
```

すると ``Pipfile``  と ``Pipfile.lock`` が生成されて仮想環境も準備された状態になる。中身はこんな感じ。

```
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
django = "==2.0.6"

[dev-packages]
"flake8" = "*"

[requires]
python_version = "3.6"
```

[packages] のDjangoの所が少し書き方が違っていたんだけど、バージョン指定するとそれで固定されるって感じなのかな。

## Django のプロジェクトを作成する
ここはいつも通り。
``pipenv shell`` で仮想環境を有効化した状態で、以下のコマンドを使ってプロジェクトを作成する。

```
$ (hoge-env) django-admin startproject hogeproject
```

## scriptを設定する
npm の npm scripts のようにコマンドのエイリアスのようなものを設定できる。

``Pipfile`` の ``[scripts]`` の下に設定していく

```
[scripts]
start = "python hogeproject/manage.py runserver"
```

これで ``pipenv run start`` で右側に書いた script が実行できるようになる。

## 使ってみて
パッケージの管理と合わせてPythonのバージョンも管理できるのは、色々考えないでとりあえずPipfile渡してinstallのコマンド叩けばいいって発想にできるしいいよなーって思う。 ~~ただ、パッケージのインストールに結構時間がかかっちゃうのが気になる点かなぁ。~~

## 参考
[2018年のPythonプロジェクトのはじめかた](https://qiita.com/sl2/items/1e503952b9506a0539ea)
[Djangoメモ(2) : Python, Pipenv, Djangoのインストールと動作確認 - もた日記](https://wonderwall.hatenablog.com/entry/2018/03/04/220000)