# blog

[![develop](https://github.com/dsk52/blog/actions/workflows/develop.yml/badge.svg?branch=develop)](https://github.com/dsk52/blog/actions/workflows/develop.yml)

Next.js製のブログアプリケーション

## 技術スタック

- Next.js 15 (App Router)
- microCMS (ヘッドレスCMS)
- Tailwind CSS
- TypeScript
- Vercel (デプロイメント)

## プロジェクト構成

```
src/
├── app/           # Next.js App Routerページ
├── components/    # UIコンポーネント
│   ├── apps/      # アプリケーション固有
│   ├── features/  # 機能別
│   └── ui/        # 汎用UI
├── libs/          # 外部サービス連携
├── types/         # TypeScript型定義
└── utilities/     # ユーティリティ関数
```

## セットアップ

```bash
# 依存関係インストール
pnpm install

# 環境変数設定
cp .env.example .env.local
```

## 開発

```bash
# 開発サーバー起動
pnpm dev

# 型チェック
pnpm type-check

# コード検証・修正
pnpm check
pnpm check:fix

# テスト実行
pnpm test
```

## ビルド・デプロイ

```bash
# 本番ビルド
pnpm build

# エクスポート（ビルド→エクスポート→サイトマップ生成）
pnpm export
```

## デプロイメント

GitHub Actionsによる自動デプロイメントをVercelで実行

## トラブルシューティング

- `pnpm --version` - パッケージマネージャー確認
- `pnpm type-check` - 型エラー診断
- `pnpm check` - コード品質確認

