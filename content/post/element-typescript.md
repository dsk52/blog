+++
title = "TypeScriptとVue.jsの環境でElementを導入し、日本語localを使う"
description = "TypeScript使用環境でElementを使用したときに、言語ファイルを読む方法のメモ"
date = 2018-04-18T00:43:19+09:00
image = ""
categories=["クリエイティブ"]
tags = ["TypeScript", "Vue.js"]
draft = false
+++

TypeScriptとVue.jsの環境で作業をしていて、Element導入時に言語ファイルを読み込んだ際上手く読み込む方法について。

ドキュメント的には以下のように書いてある。

```javascript
import Datepicker from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import locale from 'element-ui/lib/locale/lang/ja'
```

でも、TypeScriptを使っていると、最後の行で型の指定が無いためか以下のようにエラーが出た。

```
Could not find a declaration file for module 'element-ui/lib/locale/lang/ja'. ‘PATH_TO_PROJECT/node_modules/element-ui/lib/locale/lang/ja.js' implicitly has an 'any' type.
```

暗黙の any 型だぞ！みたいな話。でも、import時の型指定がよく分からなくて悩んでたんだけど、Elementのドキュメントに記載があった。

> The Chinese language pack is imported by default, even if you're using another language. But with NormalModuleReplacementPlugin provided by webpack you can replace default locale:

[Internationalization - Element](http://element.eleme.io/￼￼#/en-US/component/i18n#￼￼internationalization)

デフォルトは中国語が指定されてるけど、webpackの NormalModuleReplacementPlugin で指定すると他の言語でもいけるよっていう内容。

webpack.config.js に以下を書くだけ。
```javascript
{
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/ja')
  ]
}
```

Path変わったら死ぬけどそのときはそのとき。

これで実際コンパイルは通った。デフォルトの使用言語を変えてるからか、ドキュメントにあるようなプラグイン使用の記述なんかと合わせて local を渡してあげる記述は要らなかった。

```javascript
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
```
