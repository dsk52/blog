+++
title = "Geolocation APIで現在地の緯度経度を取得してみた"
description = "現在地の緯度経度情報を取得してそれを元に処理する事があって、Geolocation APIを触ることがあったのでその辺のやり方のメモ"
date = 2018-03-24T18:29:11+09:00
image = ""
tags = ["JavaScript"]
categories = ["クリエイティブ"]
draft = false
+++


この間現在地の位置情報を取得したいことがあって、Geolocation APIを使ってみたんだけどその時のやり方とかの覚書。  
Google MapにもGeolocation APIがあるんだけど、今回使ったのは、Web APIの方。  
[Geolocation の利用 - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/Geolocation/Using_geolocation)

瞬間的に位置情報を取得するには、 navigator.geolocation オブジェクトの ``getCurrentPosition`` メソッドで取得出来て、以下のコードで緯度経度を取得できた。

```js
navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude, position.coords.longitude);
});
```

``getCurrentPosition()`` メソッドの第1引数は取得成功時、第2引数は取得失敗時。

多くのブラウザで対応してるらしいけど、たまに対応してないものも有るらしいので以下のように geolocation オブジェクトが存在してるかをチェックしてから実行するようにしておくといいらしい。

```js
if ("geolocation" in navigator) {
  /* geolocation is available */
} else {
  /* geolocation IS NOT available */
}
```

現在地をずっと取得するなら ``watchPosition`` メソッドらしい。こっちは触ってないので割愛。
ただ、 ``getCurrentPosition`` メソッドは以下のような特徴も有るらしい。

> 既定では、 getCurrentPosition() は低精度の結果を使いなるべく速く応答しようとします。これは、正確さに関わらず速い応答を必要とする場合に役立ちます。例えば GPS を備えるデバイスでも GPS による測位には時間がかかる場合があるので、getCurrentPosition() は IP ロケーションや Wi-Fi による低精度のデータを返すことがあります。


## 位置情報の取得完了後に何かしらの処理を行う
**現在地の取得完了まで少し時間がかかる**ので、そこのハンドリングが出来てないと位置情報取得前に処理が走って値が足りないみたいな事が起こる。
なので、Promiseとかで同期処理をする必要があって、その辺も一緒に確認してたんだけど以下のサンプルが出てきた。

```js
var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

getPosition()
  .then((position) => {
    console.log(position);
  })
  .catch((err) => {
    console.error(err.message);
  });
```

[Geolocation to Promise wrap example - gist](https://gist.github.com/varmais/74586ec1854fe288d393)


## 使ってみて
Google Mapにも[Geolocation API](https://developers.google.com/maps/documentation/geolocation/intro?hl=ja)があるのですが、API制限もあるし、そこまで精度を気にせずざっくり取得するならWebAPIの方も手なのかなーと思いました。
