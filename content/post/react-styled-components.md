+++
title = "Reactで作ったコンポーネントにstyled-componentsでスタイルをあてる"
description = "この間ReactでCSSを扱う際に、styled-componentsを使ってみたのでどう使ったかとか"
categories = ["クリエイティブ"]
tags = ["React", "CSS"]
date = 2017-12-25T22:28:04+09:00
author = "Daisuke Konishi"
image = "images/common/react.png"
+++

この間ReactでCSSを扱う際に、styled-componentsを使ってみたのでどう使ったかとか。
ReactといえばCSSinJSとかCSS Modulesとか色々なアプローチがあるのは横目で見てたんだけど、今回せっかく触ってみるんだから、なんかしらに触れておきたいなと思ったんだけど、前React.kyoto辺りで聞いた [styled-components](https://github.com/styled-components/styled-components) を使ってみようと思って触ってみた。

例えばこんな感じの雑なボタンのコンポーネントがある。

``` button.js
class Button extends Component {
    render () {
        return (
            <div>
                <button 
                type="button"
                value={this.props.value}
                onClick={(event) => this.onClickButton(event)}>ボタン></button>
            </div>
        )
    }
}
```

これにCSSを当てる場合、他の方法だと、``<style>`` を作成したり変数に埋め込んで、``render()`` 内のJSXの記述にそれらを埋め込むみたいな記述らしい。
また、``<style>``や変数で作成するものでは、JSのObjectとして作成する必要があって、通常のCSSとは少し変わった書き方をする必要があみたいで、CSS(Sass)に慣れすぎてる僕にはちょっとやりにくい。

そこで、styled-components を使うとこんな感じに記述できる。


``` button.js
import styled from 'styled-components'

// 指定はcomponent外に記述する
// styledの後の要素に変わり、これに属性が当たる
const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`

class Button extends Component {
    render () {
        return (
            <div>
                <Button 
                type="button"
                value={this.props.value}
                onClick={(event) => this.onClickButton(event)}>ボタン></Button>
            </div>
        )
    }
}
```

ちょっと変わった書き方だけど、ロジックと分けてかけるのは勿論、**CSSと同じように書ける他、Sassも使える**。

``const Button = styled.button`` の左辺が実際に記述するタグになる部分で、右辺側がレンダリングされたときのタグになるのはちょっと面白いなと思った。属性なんかもそのまま付与できるし、値も渡せるのでReactっぽさを捨てないのはいいなと思う。

また、別ファイルからのimportやベーススタイルのextendにも対応しているらしいので、もう少しいい感じに使っていきたい。
