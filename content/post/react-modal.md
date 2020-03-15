+++
title = "Reactを使ったサイトでモーダルを出すならreact-modalが便利"
description = "以前仕事でいろんな所にモーダルやLightboxを表示する指示がきて、作るのめんどくさいなーと思って探しているなか見つけたreact-modalが便利だった話"
date = 2018-08-28T07:35:30+09:00
categories = ["クリエイティブ"]
tags = ["React"]
image = "images/common/react.png"
+++



## 環境

- React v16.3.2
- react-modal v3.5.1

## インストールと使い方

インストールは以下で。

```
$ npm install react-modal
```

### 使い方

使いたいコンポーネント内でimportして、 ``<Modal></Modal>`` で挟んだものがモーダルになります。 

また、 ``Modal.setAppElement()`` でAppを指定しておきます。(忘れがちなので注意)
これはモーダル自体が記述した箇所ではなく、下の方に生成されるため、どこのコンポーネント内に配置するのかにも使われる気がします。

```js
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#app");

const customStyles = {
  overlay: {
    zIndex: "100",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0",
    transform: "translate(-50%, -50%)"
  }
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        onAfterOpen={this.afterOpenModal}
        style={customStyles}
      >
       // コンテンツ部分
      </Modal>
    );
  }
}
```

state内でもっている ``modalIsOpen`` の値が Modal に渡っていて、表示/非表示を切り替えます。
また、 ``onAfterOpen`` はモーダルを表示した際に走る処理なので、開いた瞬間に中身をリセットするときとかに便利です。
``onRequestClose`` は背景のオーバーレイ部分をクリックした時に発火するようなので、 ``this.close`` を含んだ処理を渡しておくといいかも。

これをベースに HogeModal コンポーネントを作っていくとかなり楽でした。

## 表示時にアニメーションをしたい場合
react-modal で生成されたコンテンツには、 ``ReactModal__Content`` というclassが付与されるのですが、コンテンツ部分の表示後に ``ReactModal__Content--after-open`` というclassが付与されるのでこれを上手く使うと実装できます。

たとえば最初は少し上にずらしておいて、 ``ReactModal__Content--after-open`` の方にずらし多分をリセットするスタイルを書いておけば、上からおりてくるアニメーションなんかも実装できます。
