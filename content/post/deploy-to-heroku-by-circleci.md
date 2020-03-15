+++
title = "CircleCI 2.1でDjangoプロジェクトのテストとherokuへのデプロイ自動化をやってみた"
description = "以前Djangoで作ったプロジェクトへの機能追加やコードのリファクタリングをしているのですが、これを機会にCircleCIを使ってherokuへのデプロイを自動化してみました"
date = 2019-01-20T17:21:47+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["CircleCI", "Django", "heroku"]
+++

最近、Djangoで作ったプロジェクトへの機能追加やコードのリファクタリングをしていて、これを機にCircleCIを始めるべく、ver.2.1でherokuへのデプロイを自動化してみた。

ソースのgit管理とBitbucketへのpushは終わっていたので、[CircleCIのサイト](https://circleci.com)でリポジトリの連携を済ませる辺りは割愛。

## CircleCIのCLIツールを入れた
後々、知りましたがCircleCIには[CLIツール](https://circleci.com/docs/2.0/local-cli/)があった。ローカルで上手く実行できるかを試せたり(入れたCLIのバージョンでは、2.1のconfigファイルで実行するのは非対応)configファイルにバリデーションをかけられた。
pushしなくてもまず書き方があってるかを試せるので結構ありがたい。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">今更CLIツールがあって、ローカルでバリデーションかけれるの知ったわ</p>&mdash; こにたん (@skd_nw) <a href="https://twitter.com/skd_nw/status/1085581280115228673?ref_src=twsrc%5Etfw">January 16, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ビルドもできるけど、2.1は対応してないらしいのでそこは諦め</p>&mdash; こにたん (@skd_nw) <a href="https://twitter.com/skd_nw/status/1085581494578376704?ref_src=twsrc%5Etfw">January 16, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## configファイルを作成

``.circleci/config.yml`` を作成して、このymlファイルに設定を書いていく。

### Djangoのテストを走らせる処理を作成

今回Djangoのプロジェクトなんだけど、サンプルが用意されていたのでこれを元にする。  
[CircleCI-Public/circleci-demo-python-django - github](https://github.com/CircleCI-Public/circleci-demo-python-django)

CircleCI上でDockerのコンテナを立ち上げて、色々と処理をしていく流れになっていてざっくり書くと、

1. Docker Hubにあがっているイメージを元にPythonとPostgreSQLの環境を作って
2. パッケージをインストール
3. [Djangoのテスト](https://github.com/CircleCI-Public/circleci-demo-python-django/blob/master/.circleci/config.yml#L32)

という流れになっている。

あとはここに heroku へのデプロイの処理を追加する。

### herokuへのデプロイ処理を追加
CircleCIの2系で使えるようになった orbs と workflows を使っていく。

orb はCircleCIで用意されてたり、誰かが作ってたりする処理入りイメージみたいな感じ。  
[herokuのもの](https://circleci.com/orbs/registry/orb/circleci/heroku)はここに用意されていたのでこれを使えるようにconfigに追加。

```
version: 2.1
orbs:
  # https://circleci.com/orbs/registry/orb/circleci/heroku
  heroku: circleci/heroku@0.0.4
```

また、 jobs にデプロイ用のjobを追加する。

```yaml
jobs:
  build:
  :
  deploy:
      executor: heroku/default
      steps:
        - checkout
        - heroku/install
        - heroku/deploy-via-git:
            only-branch: master
```

CircleCIのダッシュボードで、JOBS > プロジェクトの「設定(歯車アイコンから移動)」 > Environment variablesからHEROKU_API_KEY、HEROKU_APP_NAMEを設定する。

この記事が分かりやすかった。  
[CircleCI 2.0からHerokuにRailsアプリを自動デプロイする - Do Something](http://tic40.hatenablog.com/entry/2018/05/04/103803)

### workflowsでjobの実行順序を制御する
workflows では job の実行を制御できるみたい。以下を追加してみる。

```yaml
version: 2.1
orbs:
:
workflows:
  version: 2
  heroku_deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build

jobs:
  build:
  :
  deploy:
  :
```

jobs下の requires がその下で記述しているjobの実行後に実行することになる。

実際使ってるのはもう少し設定を触ってるけど、一応これでテストからデプロイまで出来るハズ。
今回はherokuのorbsを使ったけど、他のものに差し替えて使ったりも出来るだろうからまたやってみる。
