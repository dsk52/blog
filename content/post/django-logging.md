+++
title = "Djangoでアプリケーションログの出力設定をしたのでその覚書"
description = "今回は、過去に作っていたDjango製アプリで、ログの設定がちゃんとできてなかったことに気づいたので、ログの設定を見直して出力するところまでやりました。"
date = 2019-10-13T14:14:23+09:00
image = "images/common/django.png"
categories = ["クリエイティブ"]
tags = ["Python", "Django"]
+++


最近仕事でもプライベートでもログ、ログ、ログ…って感じです。

今回は過去に作っていたDjango製アプリで、ログの設定がちゃんとできてなかったことに気づいたので、ログの設定を見直して出力するところまでやりました。
設定については、ドキュメントに書いてあるといえば書いてあるんですが、そのとおりに書いても出力されず、他の人の記事を漁りながら作りました。

Djangoの設定と標準ライブラリのloggingを使ってログを出力していくって感じです。  
今回はlogファイルへの出力を覚書。

## 環境

* Python 3.7.2
* Django 2.2.5

## Django側の設定

``PROJECT_DIR/settings.py`` に、LOGGING の辞書を作り、この中に設定を入れていく形になります。

こんな感じ。

```python
import os
import logging

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "file": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": PROJECT_ROOT + "/logs/django.log",
            "formatter": "verbose",
            "maxBytes": 1024 * 1024 * 1,
            "backupCount": 5,
        },
    },
    "formatters": {
        "verbose": {
            "format": "\t".join(
                [
                    "[%(levelname)s]",
                    "%(asctime)s",
                    "%(name)s.%(funcName)s:%(lineno)s",
                    "%(message)s",
                ]
            )
        },
    },
    "loggers": {
        "file": {
            "handlers": ["file"],
            "level": os.getenv("DJANGO_LOG_LEVEL", "INFO"),
            "propagate": True,
        },
    },
}
```

これで1セットできている状態で、そこにサーバーログとして吐き出すものであったり、何かしら起きた時にメールを飛ばす設定を入れたりできるみたい。  
何ができるかはlogging.handlersを掘ってみるとよさそう。

各項目はこんな感じのイメージ。

* handler: 出力先や使用するフォーマット、ファイル名など各種設定を用意
* formatters: 具体的な出力時のフォーマットを設定
* loggers: 使用するloggerの定義。上で設定したhandlerやformatterを紐付ける

今回少し他のサイトとかからの差分として、ログファイルをプロジェクトルート直下の logs/ の下に吐くようにしている。  
あと、ディレクトリがなければ作るみたいなことはしてないので、別途 logs/ を作る手順が必要になる。

Laravelの設定では有ったんだけど、日付ごとにファイルを作っていく設定ができたら嬉しいんだけど、まだわかってなくてサイズでローテーションされるのでそこは宿題。

## Logを吐き出す箇所に設定していく

各appの出力したいファイルがある箇所で、以下のように書いておくと出力されるようになった。

```python
logger = logging.getLogger("file")


logger.info("ここでログを吐きたい！")
// とか
logger.warn("DB write 失敗しました")
```

```
[INFO]	2019-10-13 15:03:31,769	file.get_context_data:21	ここでログを吐きたい！
```

時間が出るのはもちろんですが、 ``%(funcName)s:%(lineno)s",`` というフォーマットを入れておけばわざわざ書かなくてもどのメソッドの何行目かを出してくれるのでありがたいです。


## やってみて
やらないとなーと思ってたんですが、実際できるとデバッグもしやすくなるしいいなって感じ。
強いて言うなら、現状 ``logging.getLogger("file")`` の箇所で名前を指定して取得していますが改修が入った時に全部リネームする必要があるので、どっかにまとめておく方がいいかもしれない。
