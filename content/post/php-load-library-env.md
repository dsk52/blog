+++
title = "PHPでAPIを叩くときの環境変数の読み込みについて備忘録"
author = "Daisuke Konishi"
date = "2017-05-26T13:20:15+09:00"
tags = ["PHP", "API"]
categories = ["クリエイティブ"]
description = "PHPでAPIを叩く時に、APIキーの取扱いについて迷ってたんだけど環境変数を使用してみたという話"

+++

最近ちょくちょくPHP。  
今回はPHPでAPIを叩く時のアクセストークンとかシークレットキーとか、バージョン管理してうっかりGithubに上げるとやばいものを環境変数のファイルに出して監視外に置く方法が分かったのでその備忘録。


## APIキーの取扱いについて
キーをGithubで公開ちゃったが為に不正利用で100万円請求されるとか、情報書き換えられちゃって使えなくなるみたいなのをちょくちょく見かけることがあってこういうのどうするんだろうなと思ってました。環境変数で扱うのが良いみたい。

[【GitHub】に載せたくない環境変数の書き方 Python - Qiita](http://qiita.com/hedgehoCrow/items/2fd56ebea463e7fc0f5b)

## 環境変数と読み込み処理
こういうGithubでは見せたくない情報とかを入れておくとか、環境によって変える必要がある値なんかを入れておくっぽい？

ファイルとしては、 ``.env`` といったファイルに変数を記述するような感覚で記述しておく。   
見えるとまずいので ``.gitignore`` で監視対象から外しておく。

```
API_KEY = "ココにキー情報を書く"
```

このままだと誰かがどう書いたら良いのか分かりにくいので、 ``.env.sample`` とかっていうファイルにダミーの値を入れたサンプルの記述をしてgit管理しておく。

### 環境変数の読み込みにライブラリを使ってみる
このままだとAPIキーを使えないので、プログラム側に読み込みの処理を作る。この辺はライブラリが有るみたいなので、今回はそれを使ってみた。  
もともとRuby用に作られたものをPHPに移植したものらしい。

[vlucas/phpdotenv - Github](https://github.com/vlucas/phpdotenv)


これをComposerでインストールして、キーの値を拾う処理を書く。

READMEにはこんな感じに書いてある(本記事作成時)

``` bash
$ php composer.phar require vlucas/phpdotenv
```

HomebrewでComposerを入れたらコマンドがちょっと違うらしく、以下のようなコマンドでインストールできた。

``` bash
$ composer require vlucas/phpdotenv
```


### ライブラリの読み込み
この間[TwitterのAPI叩くやつ](https://blog.daisukekonishi.com/post/php-request-twitter-api.html)やってたときは、 ``use ライブラリのパス`` って形で読み込みの宣言(?)をしてたんだけど、今回はREADMEにそういう記述とかなくて、そもそもお作法が分かんなかった。

改めて調べてみると、composerでインストールしたものは、``vendor/`` の中に格納されて、その中にある **autoload.php をrequireしておけば自動で読み込んでくれる** らしい。

``` bash
vendor/
├── autoload.php
├── composer/
└── vlucas/
```

```php
<?php require_once 'vendor/autoload.php';  ?>
```

[PHPのオートロード(autoload) - Qiita](http://qiita.com/atwata/items/5ba72d3d881a81227c2a)


### 環境変数の読み込み
ライブラリ自体は読み込めたので、値の呼び出しを書く。読み込みの処理は ``getenv()`` や ``$_ENV`` 、 ``$_SERVER`` がある。それぞれ呼び出した時のスコープが変わるみたい(?)

``` php
<?php
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

$api_key = getenv('API_KEY');
```


## 最後に
環境変数についてとかAPIキーの取扱いはすぐわかったんだけど、そもそものライブラリの読み込み方が分かって無くてエラー吐かれてるのが一番面白かった。  
とりあえず解決出来たし良しかなー。
