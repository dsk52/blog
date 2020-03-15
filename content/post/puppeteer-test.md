+++
title = "Puppeteerでページのスクリーンショットを撮ってまわる"
description = "システムの開発を進めていくなかで、画面を実際触ってのテストを依頼されることが多くなってきた。また、その際「エビデンスとしてスクリーンショットを撮ってね」って言われるため、チラッと聞いていたPuppeteerでせめてスクショをガッと撮るだけでも出来ないか試してみた。"
date = 2019-03-19T09:55:52+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["JavaScript"]
+++



システムの開発を進めていくなかで、画面を実際触ってのテストを依頼されることが多くなってきた。
また、その際「エビデンスとしてスクリーンショットを撮ってね」って言われるため、チラッと聞いていた [Puppeteer](https://github.com/GoogleChrome/puppeteer) でせめてスクショをガッと撮るだけでも出来ないか試してみた。

## Puppeteer
Headless Chromeを操作するためのJavaScriptのライブラリ。
(綴りを間違えがちなのと、読みは "パペティア" らしいんだけど、最初はパペッターって読んでた。)
Node.jsから使う。

## 前準備

- Node.js v11.9.0
- puppeteer v1.11.0

```
$ npm init -y
$ npm i -S puppeteer

$ touch test.js
```

## 実際にコードを書いてみる
とりあえず、実際にブラウザを立ち上げて閉じる。

```js
const puppeteer = require('puppeteer');

(async () => {
    const BASE_URL = 'http://localhost:8080/';
    const BASE_DIST = 'dest/';
    const viewportHeight = 800;
    const viewportWidth = 1280;

    const browser = await puppeteer.launch({
            headless: true,
            // slowMo: 250
        });
    await page.setViewport({
        width: viewportWidth,
        height: viewportHeight
    });

    const page = await browser.newPage();

    // ブラウザを閉じる
    await browser.close();
})();
```

``puppeteer.launch()`` でオプション指定が出来て、headless のプロパティを false にしています。こうすることでブラウザを見える状態で立ち上げずに色々実行できる。true にするとブラウザが立ち上がってゴリゴリ動く様が見れる。


あとやること、

### 指定ページへ移動
実際にスクリーンショットを撮るページへ遷移

```js
await page.goto(`${BASE_URL}/login`);
```

とか、URLはテキトウだけどこんな感じでリンクをクリックして遷移することもできる。

```js
await page.click('a[href^="about.html"]');
```

### スクリーンショットを撮る

```js
await page.screenshot({ path: `${BASE_DIST}/IMAGE_NAME.png`, fullPage: true });
```

viewport の中だけでいいなら fullPage を調整。
スクリーンショットを撮る際に、ディレクトリを掘ってその中に保存するとした場合、そのディレクトリが存在していない場合はエラーで止まります。注意。

## 感じたポイント
``page.goto()`` や ``page.waitForNavigation()`` では引数で色々設定ができる。指定ms待ちを作ったり、どこかしらのタイミングまで待ったり。

```js
await page.waitForNavigation({ timeout: 70000, waitUntil: "networkidle2" });
```

サンプルを参考にすると、 ``domcontentloaded`` や ``networkidle2`` なんかがあるんですが、onload なタイミングでサーバーと通信して返り値をセットするようなものの場合、 ``networkidle2`` じゃないと待たずに処理が進んでしまいます。
解決方法にたどり着くまではひたすらロード画像のスクショを撮っていて笑いました。

参考: [puppeteerでよく使うであろう処理の書き方 - Qiita](https://qiita.com/rh_taro/items/32bb6851303cbc613124)


## やってみて
次やりたいこととしては、Jest と組み合わせてE2Eテストを実施できるみたいなので、そこまでやれるといいよなーと思ってます。キガムイタラ。

参考: [Jest + PuppeteerでwebサイトのE2Eテストをやってみる - WP-Kyoto](https://wp-kyoto.net/jest-with-puppeteer-to-test-published-website)
