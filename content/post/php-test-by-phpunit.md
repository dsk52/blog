+++
title = "PHPUnitでユニットテストを書くための準備をしてみた"
description = "先日PHPUnitでユニットテストを書きたくなったんですが、そもそもその準備もしてなかったので、調べながらテストを書くところまでやったので環境を準備するところを書き出しました"
date = 2020-03-15T21:40:05+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["PHP", "テスト"]
+++


なんだかんだ最近PHPを書く機会が出てきているのですが、先日PHPUnitでテストを書いてみました。
その際の導入から設定、実際に書く前まで。

## はじめに
以下で実施しました。

- PHP 7.3.x
- PHPUnit 8.4

Composerが導入されているプロジェクト前提です。


```
├ src/
├ vendor/
├ tests/  // テストコード格納
├ composer.json
├ composer.lock
└ phpunit.xml // PHPUnit設定ファイル
```

## PHPUnitを導入
とりあえず、PHPUnitをインストールします。

```shell
$ composer require phpunit/phpunit --dev
```

バージョン指定はしてないんですけど、実施時は v8.4 が入りました。
composerでパッケージをインストールする時にバージョンを指定する場合は、パッケージ名の後ろに ``:バージョン番号`` を付けるといいみたいですね。

PHPUnitは開発用なので、 dev オプションをつけて、composer.jsonの ``reequire-dev`` に追加します。

## PHPUnitの設定

### phpunit.xml を作成
こんな感じにした。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<phpunit
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    bootstrap="tests/bootstrap.php"
    cacheResult="false"
    cacheTokens="false"
    colors="true"
    stopOnError="false"
    stopOnFailure="false"
    stopOnIncomplete="false"
    stopOnSkipped="false"
    stopOnRisky="false"
    verbose="false"
    >
    <testsuites>
        <testsuite name="Test suite">
            <directory>tests</directory>
        </testsuite>
    </testsuites>
</phpunit>
```

``vendor/autoload.php`` を読む必要があって、bootstrap.php ではそれをやってる。

```php
<?php
declare(strict_types=1);
set_time_limit(0);
require __DIR__.'/../vendor/autoload.php';
```

### phpunitコマンドを設定

毎度オプション付きでコマンドを叩くのは面倒なので、composer スクリプトに追加します。
npmでやってる感覚でできないのかなーと思ってたらできるようなので設定しました。

composer.json への書き込みは、composerコマンド経由で実施する記述がよく出てくるのですが、これについてはよくわからなかったので直接編集しました。

```json
{
    :
    "scripts": {
        "test": [
            "phpunit tests/ --color"
        ]
    }
}
```

これで ``composer test`` を叩くだけで ``tests/`` 内のテストを実行できるようになりました。
設定ファイルで書いてるので諸々要らない気がします。


とりあえず、これで書く準備はできたはずなので、あとは ``tests/`` にテストスクリプトを作って流していくだけ。

## やってみて

Python(Django)アプリケーションでちょくちょくテストを書いていたんですが、PHPとなるとまたちょっと変わってるなって印象。  
仕事としてはLaravelをやる機会が増えてくると思うので、fakerとかMockeryとかあの辺使いつつ、Laravelアプリケーションのテストをさっと書けるようになりたい。

またオライリーのやつ読もかな

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=ksk1207-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873118166&linkId=670d76732c7fb352c3fea50dd1049ce2"></iframe>
