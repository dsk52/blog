+++
title = "Serverless FrameworkとFlaskでWeb APIを作りかけた"
description = ""
date = 2020-03-26T00:21:48+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Serverless Framework", "Python"]
+++


最近ちょっとAPIのアプリケーションを置き換えてみようかなと思っていて、AWSのサービスで作れたらいいなと思ったので、思い出しながらServerless Frameworkで作りかけました。

AWS SAMなんかもあるんだけど、もう少し情報ありそうなこっちをやっていくことに。

## ツール

- Serverless Framework 1.67.0

PythonとNode.jsが使えて、Serverless Frameworkのインストールが終わっていること前提です。

## 準備
Node.jsで作る記事が多いのですが、今後の事も考えてPythonで書いています。

### Serverless Framework のプラグインを導入

```sh
$ npm init -y
$ npm install --save-dev serverless-wsgi serverless-python-requirements
```

### 必要パッケージのインストール

```sh
# Pythonの仮想環境を有効化 venv とか

$ pip install boto3 flask
$ pip freeze > requirements.txt
```


### 雛形を生成
テンプレートを使って雛形を生成できる。ありがたい時代。

```
$ sls create --template aws-python --path myService
```

セットアップはこの辺に載ってる。  
参考: [Hello World Python Example](https://serverless.com/framework/docs/providers/aws/examples/hello-world/python/)

## Web APIを構築

### 設定ファイルを作成

```yaml
service: mealselect-api

plugins:
  - serverless-python-requirements
  - serverless-wsgi
custom:
  wsgi:
    app: main.app
    packRequirements: false
  pythonRequirements:
    dockerizePip: non-linux

provider:
  name: aws
  runtime: python3.8
  stage: dev
  region: ap-northeast-1

package:
  exclude:
    - __pycache__
    - .vscode
    - bin/**
    - venv
    - .envrc
    - node_modules
    - README.md

functions:
  app:
    handler: wsgi_handler.handler
    timeout: 30
    events:
      - http: ANY /
      - http: 'ANY {proxy+}'
```

### FlaskでJSONを返すAPIを作成

コマンドでひな形を生成した際は、 handler.py ができる。  
ただこれは別名でもいいらしいので、わかりやすいように main.py を作る。

```py
from flask import Flask, jsonify

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False

@app.route('/')
def hello():
  body = {
    "message": "Go Serverless v1.0! Your function executed successfully!",
  }

  response = {
    "body": json.dumps(body)
  }
  return jsonify(response), 200
```


あとは、 ``$ sls deploy`` でしばらく待てばセットアップしてくれる。


## 参考
- [Build a Python REST API with Serverless, Lambda, and DynamoDB](https://serverless.com/blog/flask-python-rest-api-serverless-lambda-dynamodb/)
- [Serverless Framework で Flask app をデプロイする – サーバーワークスエンジニアブログ](http://blog.serverworks.co.jp/tech/2019/01/08/serverless-flask/)
- [serverless frameworkでAWSにサーバレスなAPIサーバーを作る - Rails Webook](https://ruby-rails.hatenadiary.com/entry/20180701/1530441888)


## やってみて
まだまだ理解が足りなくてハマリポイントが多いので、EC2の小さいインスタンスにFlaskアプリを置いたら良いんじゃない？っていうもうひとりの自分との戦いになってきてる。

今はここからDynamoDBと接続するあたりで格闘中。
