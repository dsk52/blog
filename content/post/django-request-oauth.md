+++
date = "2017-07-26T09:09:05+09:00"
tags = ["Python"]
categories = ["クリエイティブ"]
description = "Pythonを使って認証通してTwitterのAPIにリクエストを送るときの覚書"
title = "Pythonでrequestsとrequests_oauthlibを使ってTwitterのAPIを叩く"
author = "Daisuke Konishi"
image = "images/common/django.png"
+++

これまで何度かPHPでAPI叩いてたんだけど、Pythonやりだしたのでそっちでやる方法調べてた。  
Twitter APIのアクセストークンなんかは[TwitterのDevelopersサイト](https://dev.twitter.com/index)でアプリ作って取得済み。

## TwitterのAPI関連のライブラリはいくつかある
[Twitter Developersのサイト](https://dev.twitter.com/resources/twitter-libraries)でも[python-twitter](https://code.google.com/archive/p/python-twitter/)とか[Twitter API](https://github.com/geduldig/TwitterAPI)とか[tweepy](https://github.com/tweepy/tweepy)とかいくつか紹介されてる。

ただ、こういった専用のもの使うよりもう少し汎用的なもの使って覚えたほうが勉強になるし使いまわせたりするんじゃないかなーと思って別の方法で試した。


## requestsとrequests_oauthlibで認証のリクエストを送信する

Twitter APIへのリクエスト処理は、 requests というライブラリで行った。名前そのままだし分かりやすい。

[requests/requests: Python HTTP Requests for Humans™ ✨🍰✨ - github] (https://github.com/requests/requests)

また、Twitter APIへの認証に関しては、requests_oauthlib というライブラリで行った。

[requests/requests-oauthlib: OAuthlib support for Python-Requests! - github](https://github.com/requests/requests-oauthlib)

どっちも pip でインストールできる。

```shell
$ pip install requests requests-oauthlib
```

### 実際に使う
結構シンプルに書ける。

```python
from requests_oauthlib import OAuth1Session, OAuth1
import requests

oauth = OAuth1(
    # ココにCONSUMER_KEY,
    # ココにCONSUMER_SECRET,
    # ココにaccess_token,
    # ココにaccess_token_secret
)

response = requests.get(
    'https://api.twitter.com/1.1/search/tweets.json?q=python',
    auth=oauth
)
```

requestsの ``.get()`` の後ろに ``.json()`` を付ければレスポンスをJSON形式にしてくれる。

### 参考
[Requests の使い方 (Python Library) - Qiita](http://qiita.com/sqrtxx/items/49beaa3795925e7de666)


### 余談
レスポンスをjson形式で保存して中身を見たいなって思ったんだけど、JSON形式で整形してファイル出力してくれる方法が記事であった。

- [JSONファイルのフォーマットを整えてDumpする - Qiita](http://qiita.com/Hyperion13fleet/items/7129623ab32bdcc6e203)
- [Python: テキストファイルに書き込み – write()、writelines()メソッド]( http://www.yukun.info/blog/2008/09/python-file-write-writelines.html)


## おまけ: クエリストリングを作りたい場合
辞書と urllib ライブラリの ``parse.urlencode()`` を使うと、PHPでいうところの ``http_build_query()`` みたいなのができた。

```python
import urllib

querys = {
    'q': '-RT Linkin Park',
    'count': 100
}
querystring = urllib.parse.urlencode(querys)
```

## まとめ
requests と requests_oauthlib の2つのライブラリでTwitter APIへのリクエストが送信できた。
