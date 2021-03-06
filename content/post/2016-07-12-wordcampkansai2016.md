---
title: 'WordCamp Kansai 2016に当日スタッフとして参加してきました #wck2016'
author: コニタン
type: post
date: 2016-07-11T23:10:55+00:00
url: /archives/1830
wordtwit_post_info:
  - 'O:8:"stdClass":13:{s:6:"manual";b:0;s:11:"tweet_times";s:1:"1";s:5:"delay";s:2:"15";s:7:"enabled";s:1:"1";s:10:"separation";i:60;s:7:"version";s:3:"3.7";s:14:"tweet_template";b:0;s:6:"status";i:2;s:6:"result";a:0:{}s:13:"tweet_counter";i:4;s:13:"tweet_log_ids";a:3:{i:0;i:1856;i:1;i:1857;i:2;i:1858;}s:9:"hash_tags";a:0:{}s:8:"accounts";a:1:{i:0;s:6:"skd_nw";}}'
wordtwit_posted_tweets:
  - 'a:3:{i:0;i:1856;i:1;i:1857;i:2;i:1858;}'
categories:
  - 行ってきた
tags:
  - WordPress
  - イベント

---
大阪大学で7月9日〜10日に開催された<a href="https://2016.kansai.wordcamp.org/" target="_blank">WordCamp Kansai 2016</a>に参加してきました。
  
WordCampに関しては今回が3回目の参加で、3年連続で参加しています。関西限定ですけどね。

<blockquote data-secret="tcFktWRu3H" class="wp-embedded-content">
  <p>
    <a href="http://peng-note.com/archives/1003">WordCamp Kansai 2014に行ってきました その１</a>
  </p>
</blockquote>



<blockquote data-secret="sa8agAqs3F" class="wp-embedded-content">
  <p>
    <a href="http://peng-note.com/archives/1636">WordCampKansai2015に行ってきました</a>
  </p>
</blockquote>



さて今回は、これまで参加してきた勉強会で「こういう勉強会とかイベントのスタッフいつやんの？」って言われたり、なんとなくそろそろやってみようかなという気持ちが有ったのでスタッフとして参加登録してみました。
  
ホントは実行委員やりたかったのですが、今年が新卒でちょうど参加申請をする頃が忙しくてこの状況で実行委員レベルで参加するのはリソース的に厳しかったので断念しました。(来年関西であれば是非…！

## 気になったセッション

当日スタッフの仕事をしつつセッションを聞いていたのですが、その中で気になったセッションをちょこっと紹介。

### WooCommerceでECサイトを構築するときや運用上の注意

WordPressでコンテンツを管理しながらECサイトを構築できるWooCommerceに関するセッションでした。

> WooCommerce（ウーコマース）とは、世界で最も利用されているwebサイト構築システムであるWordPressのプラグイン（追加機能）として開発されたカートシステムです。 

WooCommerceに関しては少し気になっていたので聞けて良かったです。(正直しっかりとは聞けていなかったのですが)

セッションの中では、案件のパターンによってWooCommerceと楽天のようなASPとの使い分けであったり、実際のWooCommerceを使った実装の方法なんかが紹介されていました。

WooCommerceのテーマは実際に公開されていたり、自作する際もWordPressのテーマが作れる人なら**少ない学習コスト**で組むことができるそうです。

聞いた後でちょっと触ってみたいなと思いました。

### WordPressで構築するMicroservice　Architectures

岡本さん(<a href="https://twitter.com/motochi" target="_blank">@motochi</a>)のセッション。



通常WordPressを導入する際、1つのレンタルサーバーなんかに全ての機能を盛り込んでしまうということはやりがちだけど、それだと1つに障害が起こると全部に影響が出るから切り離そうという内容のセッション。

例としてあげられていたのが、

  * マーケティング -> Mautic
  * 検索 -> Elastic Search
  * ? -> kibana // 何か忘れた
  * ログの収集 -> logstash

といった感じで機能を外部サービスに切り分けて使うというもの。
  
こうすることで**メンテナンスもしやすくなる**し、障害に強くなる(**どれか他のサービスが落ちてもその他に影響を与えない**(にくい)ものが作れる)

インフラまでは手を出せていないのですが、こういう知識も必要になってくるだろうなと思って聞いていました。

### セッションのまとめ

今回のテーマが「**For the future**」だっただけに、セッションの内容も、これまでのような「テーマつくったよー」みたいな話よりかはこれから先を見据えた内容が多かったり(体感)、**スケールする**というキーワードはよく耳にしました。

AWSを活用して機能を切り分けるようなサーバー側の話であったり、WP REST APIが絡んだ話は多かったように思います。

## スタッフをやってみて感じたこと

とりあえずやってみてなんか楽しかったです。
  
ずっと1階のスタジオでウロウロしたり、動画を撮ったりしながらセッションやハンズオンを聞いてたのですが、その合間に
  
色んな人と話せたので。
  
ただ、準備の為に早く起きなきゃいけないのだけ辛かった_(:3」∠)_ 間違って早く来ちゃってキャンパス内散歩したのは良い思い出。

あと、実行委員の方々には色々段取りしていただいてほんと感謝でした。
  
当日スタッフを仕切ってもらってたので自然と見る機会が多かったのですが、ミスミさん(<a href="https://twitter.com/misumi_takuma" target="_blank">@misumi_takuma</a>)にはほんとに感謝です。Facebookグループでもじゃんじゃんミスミさんの書き込み通知飛んでくるしミスミさん<del datetime="2016-07-11T14:16:30+00:00">喋りすぎぃ</del>仕事し過ぎぃ！と思って見てました。
  
お力になれず申し訳なかったです。
  
次回はもうちょっとお手伝いします。

## 全体の感想

今回、スタッフとして参加したことにより、去年までの参加者側で参加する時と比べてより多くの人と話すことが出来たような気がします。前から気になってた人とか、最近見かけていつか話しかけるぞって思ってた人とか、当日初めて出会った人とか。
  
次はもう少し話しかけもしたいし、LTやるとか司会やるとかもうちょっと中心に寄りたいなーと思いました。

あと、あの人もしかしてと思いつつ確信が持てないって事が多かったので、WCK2014の時みたくGravatorで設定してるアイコンをカードに載ってるとありがたいなーと思ってました。来た人に配るのが大変になったり参加申請してない人どうすんだって問題はありますけどね。

## つぶやき

実はコッソリ翻訳のコントリビューターになったのでバッヂを付けて歩いていたんだけど、名前書いてくださいって言われたの1回だけだったのなんなの！(しかもスタッフから)
  
数か！数が足りないのか！　プラグインか公式テーマ作って増やすか…！