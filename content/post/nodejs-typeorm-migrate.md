+++
title = "TypeORMとTypeORM SeedingをセットアップしてMySQLにseedデータを流すところまでやってみた"
description = ""
date = 2021-10-11T02:01:56+09:00
image = ""
categories = ["クリエイティブ"]
tags = ["Node.js", "TypeORM"]
+++



## はじめに

久々にNode.jsをやる機運が高まってきたので、とりあえず何度か触ったことあるExpressをおさらいしながら、DBアクセスを振り返りつつ聞いたことがあるものを触ってみようかなという感じで、TypeORMを触ってみた。

知り合いがちょくちょく[prism](https://github.com/prisma/prisma)触ってるのでそっちやってみようかと思ったんだけど、まだ発展途上っぽい感じだったので、一旦[TypeORM](https://github.com/typeorm/typeorm)を触ってみようって感じ。


## 環境

ホストマシンで直接Node.jsを起動。Dockerで立てたMySQLにつなぎにいく想定です。

* Node.js v14.15.3
    * typeorm 0.2.37
    * typeorm-seeding 1.6.1
* MySQL 8.0.26


## やってみる

構成はこういう感じ。(一部抜粋)

```
├ :
├── ormconfig.ts
├── package-lock.json
├── package.json
├── src/
│   ├── app.ts
│   ├── controllers/
│   ├── db/
│   │   ├── factory  // Seedデータを生成するファクトリの格納場所 後述
│   │   ├── seed  // factoryで生成してデータを流す処理の格納場所 後述
│   │   └── db.ts // TypeORMでDBにコネクションを張る処理とか
│   ├── entity/
│   └── migration/  // 
└── tsconfig.json
```

``app.ts`` が起点になるファイルで、そこから各種ファイルを読んでる。

### TypeORMの設定ファイルを用意

ドキュメントに従うと、JSON形式になるんだけど、JS/TSな方が何かと便利なので途中で切り替えた。

```ts
// ormconfig.ts
import { ConnectionOptions } from "typeorm-seeding";

const Config: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  synchronize: false,
  logging: false,

  entities:
    process.env.NODE_ENV === "test"
      ? ["src/entity/**/*.ts"]
      : ["build/entity/**/*.js"],
  migrations:
    process.env.NODE_ENV === "test"
      ? ["src/db/migration/**/*.ts"]
      : ["build/db/migration/**/*.js"],

  // TypeORM-seeding用の設定
  seeds: ["src/db/seed/**/*.ts"],
  factories: ["src/db/factory/**/*.ts"],
};

export default Config;
```

entitiesとmigrationsについては、seedデータを流す際にEntityのファイルがうまく参照出来ず、諸説ある感じだったんだけど開発時はTS、実稼働はJSって感じで分ける形で落ち着いた。
[{ EntityMetadataNotFound: No metadata for "User" was found. · Issue #1327 · typeorm/typeorm](https://github.com/typeorm/typeorm/issues/1327)


### Entityを用意

毎度題材に困るんだけど、 ``src/entity/Book.ts`` を用意した。

```ts
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  title: string;

  @Column({ name: "publish_date" })
  publishDate: Date;
}

export default Book;
```

最近datetimeとかよく触るのでその辺知りたいよなーと思って、発刊日時を扱うpublishDateを用意してみた。
カラムはスネークケースにしたいんだけど、migrationする際にそうはならない仕組みらしくて、変換かける処理を書くか今回みたいに ``@Column()`` にオプションを書くことで実現できるみたい。

プロパティにアノテーションをつけてカラムの型や制約、インデックス、外部制約なんかを定義するみたい。  
メモだけど、DateについてはJSへの変換時にh:m:sなデータが無いとおかしくなるから実態としてはStringで持つらしい。この辺は要調査。

Entityの定義については、ドキュメントと合わせてここ読むと良さそう  
[TypeORMでエンティティを定義する際のガイドライン](https://tech.bitbank.cc/typeorm-entity-guideline/)


### migration実行

特筆次項無し。

migration用のスクリプトを生成した際は、entities, migrationsを ``~~/*.js`` にしていたので、一度ビルドしないと生成出来なかったり、流せなかったりしてめんどかった。


### TypeORM-SeedingでSeedデータを流す

各種APIを実装する前に、ダミーデータがほしいなと思ったので、Seedの生成とDBへのinsertを試みた。

最初、 [typeorm-fixtures-cli - npm](https://www.npmjs.com/package/typeorm-fixtures-cli) を使ってみてたんだけど、どうにも流れないのと情報が少なかったので、 [w3tecch/typeorm-seeding: 🌱 A delightful way to seed test data into your database.](https://github.com/w3tecch/typeorm-seeding) に移行した。アイコンが可愛い。


Entity側は特に変更の必要が無くて、FactoryとSeederを作る事が必要だった。

```ts
// src/db/factories/book.factory.ts
define(Book, (faker: typeof Faker) => {
  const book = new Book();
  book.title = "本のタイトル";
  book.publishDate = new Date();

  return book;
});

export default Book;
```

```ts
// src/db/seeders/create_book.seed.ts
export default class CreateBook implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    await factory(Book)().create();
  }
}
```

FactoryでEntityを生成して、ダミーデータを差し込む。それをSeederで実際にDBに流すって感じの流れ。
Seeder内では複数個生成することもできるみたい。

Factory内でFaker使ってタイトルと日付を適当に生成してみようと思ったんだけどここはまだ調整中。

### Seedを流す

```
// package.json
"scripts": [
    seed:run": "ts-node ./node_modules/typeorm-seeding/dist/cli.js seed
]
```

```sh
$ npm run seed:run

> ts-node ./node_modules/typeorm-seeding/dist/cli.js seed

🌱  TypeORM Seeding v1.6.1
✔ ORM Config loaded
✔ Factories are imported
✔ Seeders are imported
✔ Database connected
✔ Seeder CreateBook executed
👍  Finished Seeding
```

できた

## まとめ

細切れに時間が確保出来たのもあるけど、お作法が分かるまでちょっと時間がかかった。

テストデータ調整したらJestでテスト書いたりAPIの実装してみようかな。
