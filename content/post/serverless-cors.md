+++
title = "Serverless Frameworkで作ったAPIにCORSの設定を入れる"
description = ""
date = 2020-05-03T15:24:05+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Serverless Framework", "Python"]
+++



  
前回の [Serverless FrameworkとFlaskでWeb APIを作りかけた](https://blog.daisukekonishi.com/post/serverless-framework-start/)の続き。

前回の時点でAPIはできていて、これを別のURLから叩けるようにするためにCORSの設定を入れる。

設定を入れるのは以下

- Serverless Frameworkの設定側 (実際はAPI Gateway)
- Lambdaアプリケーション側



## Serverless Framework側で設定を追加する

events の下で細かく設定はできるみたいだけど、 cors の設定を入れるのが一番シンプルみたい。

``` serverless.yml
functions:
  app:
    handler: wsgi_handler.handler
    :
    events:
      - http: ANY /
      - http:
          path: '/{proxy+}'
          method: ANY
          cors: true
```

参考: [Serverless FrameworkでCORS有効化したAPI Gatewayの作成 – サーバーワークスエンジニアブログ](http://blog.serverworks.co.jp/tech/2019/05/14/post-70323/)


設定できると、AWS ConsoleでAPI Gatewayの設定にOPTIONSの項目が追加される。


## Lambdaアプリケーション側にも追加する

レスポンスのヘッダーにパラメーターを追加する。

前回はPythonでFlaskを使っていたので今回もそれ前提。

``` lambda.py
from flask import jsonify

def hello():
    :
    response_body = {
        "message": "Hello World"
    }
    response = jsonify(response_body)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response, 200
```

前回は辞書を ``jsonify()`` を通して返していた。
ここでheaderメソッドで ``Access-Control-Allow-Origin`` パラメーターを付与してそれを返すようにすることで、headerに情報を載せることができた。

追記:
Response クラスで設定するか ``make_response()`` で設定するのが正しい方法みたい。  
- [API — Flask Documentation (1.1.x)](https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response)
- [python - How do I set response headers in Flask? - Stack Overflow](https://stackoverflow.com/questions/25860304/how-do-i-set-response-headers-in-flask)


最初Serverless Framework側のみの設定でできなくてハマったんだけどなんとかできてよかった。
