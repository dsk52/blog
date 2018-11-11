+++
title = "Djangoで、JSONのレスポンスを返す部分を関数ベースからクラスベースビューに書き換えてみた"
description = "Djangoで、これまで関数ベースビューでJSONを返していたのですが、返す内容を加工する際に関数ベースにしていると見にくくなってしまうため、クラスベースに置き換えました"
date = 2018-11-11T22:38:03+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Django"]
+++

これまで作っていたもので、関数ベースのViewを採用してJSONを返していたのですが、返すものを加工したり他のものを追加するような事が出てきてクラスベースビューにしておいたほうが色々都合がいいんじゃないかなと思いクラスベースに書き換えてみました。

## 環境

- Django v2.1
- Python v3.6.0

## これまで使っていた関数ベースビュー


hogeapp/view.py

```
from django.http import JsonResponse

def hogeView(request):
    hoge = {}

    # データのセットとか
 
    return JsonResponse(hoge)
```

JSONを返す部分については、[JsonResponse](https://docs.djangoproject.com/ja/2.1/topics/class-based-views/#supporting-other-http-methods) というHttpResponse のサブクラスがあって、これに辞書を渡したものを返す事でJSONのレスポンスが返せます。

このviewをurlsで呼び出してあげることで、JSONが返えるようにしていました。

hogeapp/urls.py

```
urlpatterns = [
    path('hoge/', views.hogeView)
]
```

## クラスベースビューに書き換える
Djangoでは、Templateを返したり指定したModelを元に登録や更新などの処理を行う汎用Viewが用意されています。
これらは、[django.views.generic.base.View](https://docs.djangoproject.com/ja/2.1/ref/class-based-views/base/#view) というViewを継承して用途に応じて汎用的に作られているらしいのですが、今回はテンプレートを返したりフォームを作ったりはしないのでこれをそのまま採用しました。(下記コードはドキュメントから)

なので、 urls.py と view.py はこんな感じで書き換えました。

hogeapp/view.py

```
from django.http import JsonResponse
from django.views import View

class HogeView(View):

    def get(self, request, *args, **kwargs):
        self.hoge = {}

        # 返すものを追加したり

        self.response()
    
    def response(self):
        return JsonResponse(self.hoge)
```

hogeapp/urls.py

```
from django.urls import path
from .views import HogeView

urlpatterns = [
    path('hoge/', HogeView.as_view()),
]
```

``as_view()`` をつけておきます。


## やってみて
実際に書き換えたプロジェクトでは、他にもいくつかAPIがあって全部JSONを返すので、共通部分をクラス化して使い回せるようにしています。こういう事ができるのも良さかなと思います。

また、関数ベースからクラスベースになったので、返すものを新しく追加する際もメソッドを作って対応できるようになったので見やすくなったかな。

※git diffを見つつちょっと書き換えているので、このままコピペして動くかは保証できません。こんな雰囲気って感じで見てください。