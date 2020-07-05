+++
title = "Pythonの依存管理周りをpyenv+venvからPipenvに移行しました"
description = ""
date = 2020-07-05T09:12:22+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Python"]
+++



あるプロジェクトで、今まで pyenv と venv で環境を作っていたのですが、requirements.txt でのパッケージ管理が辛くなってきたのと、今後のことも考えて [Pipenv](https://pipenv.pypa.io/en/latest/) に移行しました。


## なぜPipenv
選択肢として [Poetry]((https://python-poetry.org/)) もあったんですが、依存パッケージも全部書かれてる requirements.txt から移行するにはハードルが高い様な気がしたので、情報の多い Pipenv にしました

あと、デプロイ先として Heroku を使うことが多いんですが、Heroku で Poetry を使おうと思うと Pythonの build-pack を使ったらいけたよみたいな細い情報しかなくてつらそうだったので一旦標準サポートの Pipenv にしたというところもあります。

あと、過去に一回試してた。
[pipenvでDjangoの環境を作る · PengNote - 勉強した事や行った場所の感想を書くブログ](https://blog.daisukekonishi.com/post/try-pipenv/)


## 移行手順

### 1.Pipenv をインストール

とりあえず Pipenv をインストール。Macに入れてしまって良いやと思ったので、brewで。

```
$ brew install pipenv
```

既存のプロジェクトでのパッケージの状態はDjangoを入れただけなのでこんな感じです。

```
$ cat requirements.txt
Django==2.2.14
pytz==2020.1
sqlparse==0.3.1
```

### 2.Pipfileの用意とインストール実行
インストール用の以下のコマンドを実行したら Pipfile が作られました。

```
$ pipenv install
```

この時、以前は ``pipenv install -r requirements.txt`` しないと取り込めなかったような気がするんですが、この時点で requirements.txt の内容がそのまま packages に入れてくれてました。


```
$ cat Pipfile
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[dev-packages]

[packages]
pytz = "==2020.1"
sqlparse = "==0.3.1"
Django = "==2.2.14"

[requires]
python_version = "3.8"
```

### 3. 依存パッケージの整理
ただ、依存パッケージについては Pipfile.lock の方で管理してくれたらいいのでここから除外します。

その時に便利なのが pipenv の graph というオプションで、依存関係を表示してくれます。(一階層下がっているものが依存パッケージ)

これがあるのを知ってPipenvに飛びついたところもありますが、 pipdeptree パッケージで同じようなことができるようです。  
[pipdeptree · PyPI](https://pypi.org/project/pipdeptree/)

```
$ pipenv graph
Django==2.2.14
  - pytz [required: Any, installed: 2020.1]
  - sqlparse [required: >=0.2.2, installed: 0.3.1]
```

除外後のPipfileの状態で ``pipenv install`` をすると Pipfile の内容を元に依存解決をしながらインストールしてくれるので、これで移行完了です。


## 移行したことによって
**自分で管理すべきパッケージがぐっと減るのでパッケージ管理がしやすくなった**ところが大きいなと思います。

あとは、Pipfile内に npm-scripts みたいな感じでスクリプトを書いておけるので今まで shellscript なんかで避けていた記述もまとめられていいです。

---

でも、新規でなんか作るときは Poetry 使ってみたいな
