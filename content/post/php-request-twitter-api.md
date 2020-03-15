+++
date = "2017-05-09T00:35:20+09:00"
tags = ["PHP","Twitter", "API"]
categories = ["クリエイティブ"]
description = "PHPのTwitterOAuthというライブラリを使って、TwitterのSearch API叩いた話"
title = "PHPでTwitterのSearch APIを叩いて情報収集しかけた"
author = "Daisuke Konishi"

+++

## はじめに
最近仕事でPHPに触れる機会が増えてきた。
といっても、WordPressのテーマ作るときにテンプレートタグ入れたり、サイト内で同じような見た目のものをループ回して作るみたいなそんなのばっかだけど。

仕事で使わざる負えないとか、使った方が間違いなく楽できるみたいなシーンに出会うとやるもんだなぁと思う今日此の頃。

で、まぁ出来ること増やしたいのとちょっとやりたいことがあったのでAPI叩き始めたわけです。
あんまり深入りはしたくないけど…


## Composer入れた
そういえばComposerって名前を聞くものの入れたことも触ったこともないなーと思って入れてみました。
JavaScriptでいうところのnpm的なライブラリなんかの管理ツールらしい。

[Composer](https://getcomposer.org/)

ちゃんと覚えてないけど、ここで迷ってる場合じゃないやと思ってHomebrewで入れた気がする。ありがとうHomebrew。


## ガンガン書く
Composer入れたけど、特に何をするわけでもなく、[Twitterのデベロッパー登録](https://dev.twitter.com/resources/signup#)を終えてとりあえず分かる範囲で書いてた。

連想配列でクエリの情報作って、 ``http_build_query()`` でクエリを作って ``file_get_content()`` でリクエストってやり方ちょくちょくやるんだけど、こんな感じなのかな‥？


ある程度書いたんだけど、認証周りってどうやるんだっけと思って調べてたら、 **TwitterOAuth** というライブラリが出てきた。

[abraham/twitteroauth: The most popular PHP library for use with the Twitter OAuth REST API.](https://github.com/abraham/twitteroauth)

Composerでインストールして、読み込んだ後、以下のコードでリクエスト作れるという簡単さ

``` php
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token, $access_token_secret);
$content = $connection->get("account/verify_credentials");
```

getメソッドの第1引数で叩くAPIを変えれて、第2引数に連想配列を与えるとクエリにしてくれてリクエストしてくれるみたいな作り。すごいお手軽。

```php
$statuses = $connection->get("search/tweets", ["q" => "twitterapi"]);
```

エラーハンドリングとか色々やりかけて、Streaming API叩かなきゃじゃなかったっけって思ったんだけど、対応してないらしくて、それ見た瞬間やり方ったこと忘れたのでそこで終わった。


## まとめ
TwitterOAuthは結構楽に使えたので良さそう。
リクエストの仕方が悪いのか15件しかとれてないのでもっと取るにはとか、取得した続きを更に取得するにはどうするのかとかちょっと分かってないので引き続きやる。かも。
