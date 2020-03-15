+++
title = "DjangoでDBに保存したデータをTemplateで表示するあれこれについて"
description = "DjangoでDBに保存したデータを表示する辺りで一部どうすんのってなったのでその辺まとめて覚書"
date = 2019-01-14T19:29:41+09:00
image = "images/common/django.png"
categories = ["クリエイティブ"]
tags = ["Django"]
draft = false
+++

去年の年末あたりから、またDjangoに戻って色々勉強してる。
以前触っていたときは関数ベースでやることが多くて、クラスベース汎用ビューってあんまり触ったことなかったので、最近はその辺を中心に認証とかファイルアップロードとか色々広げていってる。

今回は、**モデルフォームとか作ってDBに保存したデータを DetailView なんかで表示する**ときの話。

## 環境
* Django v2.1

```
.
├── Pipfile
├── Pipfile.lock
├── board  // 今回使う App
├── config  // project で生成されるファイル。誰かがこの命名にしてたから真似てみた
├── db.sqlite3
├── manage.py
├── static  // CSSとかJSファイル
└── templates  // テンプレートファイルをまとめてる
```

※``views.py`` や ``models.py`` は、 ``board/`` 直下にあるはずだけど、うまく動かなかったらimportする時のpathを要調整。

## データを表示する
クラスベース汎用ビューで画面を返すと、class内で使うModelとかTemplateを設定出来るしみやすい気がするのでちょっといいなーと思ってる。こんな感じ。こっから下はずっとクラスベースでやる話。

views.py

```python
from django.views.generic import DetailView
from .models import Board

class Detail(DetailView):
    model = Board
    template_name = 'path/to/template'
```

モデルでは、タイトルと内容を扱えるようにそれぞれフィールドを作ってる。

models.py

```python
from django.db import models

class Board(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title
```

detail.html

```html
{% extends 'base.html' %}

{% block title %}{{board.title}} 詳細{%endblock%}

{% block content %}
<div class="c">
  <div class="board-detail">
    <header class="board-detail__header">
      <h1>{{board.title}}</h1>
    </header>
    <div class="board-detail__body">
      {{ object.content }}
    </div>
  </div>
</div>
```

**Modelで定義したフィールドと同じ名前をTemplate側で使う**事で参照できる。  
ViewからTemplateに渡すときに、 ``object`` の中に格納されるので、そこからフィールド名を使って表示させる。

※ListViewだと ``object_list`` に格納されるっぽい。

## Modelで処理した後のデータをViewに渡す
別プロジェクトで勉強がてら作っていたものの中で、 **ユーザーの年齢** を出したいなってなったから調べてた。  
題材にもよるかもしれないけど、年齢を保存するんじゃなくて**誕生日を保存してそこから計算するのが良いよねってなり、その方法をModelでやる方法**を探してた。(Viewで渡された値を使って計算する方法がいっぱい出てきた)

結論からいえば、処理結果を返すメソッドを作り ``@property`` っていうデコレータをつける事で、Viewではその**関数名で処理結果を出力出来るようになる**。

```python
class User(AbstractUser):
  :
  birth_date = models.DateField('誕生日')

  @property
  def age(self):
          if self.birth_date is None:
              return None
          today = date.today()
          age = today.year - self.birth_date.year
          if today < self.__yearbirthday(self.birth_date, today.year):
              age -= 1
          return age

      def __yearbirthday(self, birth_date, year):
          try:
              return birth_date.replace(year=year)
          except ValueError:
              birth_date += timedelta(days=1)
              return birth_date.replace(year=year)
```

参考: 

* [python - django template 計算 - モデル内の関数を呼び出すdjangoテンプレートシステム](https://code.i-harness.com/ja-jp/q/1457c5)
* [[Python] 年齢の計算](http://d.hatena.ne.jp/cheeseshop/20090210/1235591147)


## 選択形式(セレクトボックス)で保存したデータを元に、ラベルの方を表示する
こういう感じでModelを作っていたとして、 ``a`` で保存されているけど、実際に表示させたいのは ``A型`` っていう場合にどうするかみたいな話。

models.py

```python
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  BLOOD_TYPE = (
        ('a', 'A型'),
        ('b', 'B型'),
        ('o', 'O型'),
        ('ab', 'AB型'),
        ('unknown', '不明')
    )
  blood_type = models.CharField('血液型', max_length=10, choices=BLOOD_TYPE, null=True)
```

上のような形式のタプルを choices に渡すと、フォーム上はセレクトボックスの形式で表示され、表示はA型、B型だけど実際は a とか b みたいな1つ目の値が表示される。

これを表示する時のものを自作する必要はなく、Django側が勝手に作ってくれる。 ``get_FIELDNAME_diaplay`` の形式。

detail.html

```html
  <dl>
    :
    <dt>血液型</dt>
    <dd>{{ object.get_blood_type_display }}</dd>
    :
  </dl>
```

参考: [Django: Display Choice Value](https://stackoverflow.com/questions/4320679/django-display-choice-value)


## やってみて
どうやんのーってなってからも見つかるのが早いし、 ``@property`` とか ``get_FIELDNAME_diaplay`` を見つけたときはちょっと感動しました。Djangoがいい感じに作ってくれたり用意されてたりするので開発してて気持ちいいというか。これがフレームワークかみたいな気持ちになります。

まだまだやってみることは色々あるけど、フロントエンドとは違った楽しさがあるなーと思ってウキウキやってます。
