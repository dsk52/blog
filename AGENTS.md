# リポジトリガイドライン

## プロジェクト構成とモジュール配置
このリポジトリは Next.js App Router 構成です。ルーティングは `src/app/`（ページ/ API / sitemap）に集約され、UI は `src/components/`（`ui/`、`features/`、`page/`、`seo/`、`layouts/`）に整理されています。共通ロジックは `src/libs/`（microCMS、GTM、markdown）、`src/utilities/`（ユーティリティ）、`src/constants/`（サイト/ルート設定）に分離されています。静的アセットは `public/`（例: `public/images/`）に配置します。

## ビルド・テスト・開発コマンド
作業はすべて pnpm を使用します。
1. `pnpm dev` / `pnpm dev:turbopack`: ローカル開発サーバー起動
2. `pnpm build`: 本番ビルド（Next.js）
3. `pnpm export`: 静的エクスポート + sitemap 生成
4. `pnpm check`: Biome の lint/format チェック（`src/` 対象）
5. `pnpm check:fix`: Biome の自動修正
6. `pnpm type-check`: 型チェックのみ（noEmit）
7. `pnpm test`: Vitest 実行

## コーディングスタイルと命名規約
TypeScript と Biome を前提に、既存パターンを優先します。
1. React コンポーネントは `PascalCase`、hooks は `useX`、定数は `UPPER_SNAKE_CASE`、関数/ユーティリティは `camelCase`
2. Tailwind ユーティリティは `tw:` プレフィックスを使用し、`clsx` で条件分岐をまとめる
3. フォーマットは Biome に任せ、手動の整形は最小限

## テストガイドライン
テストは Vitest と React Testing Library を使用します。実装と同階層に `.test.ts` / `.test.tsx` を配置します（例: `src/components/seo/PersonJsonLd.test.tsx`）。実行は `pnpm test` を使用し、現状はカバレッジ閾値の指定はありません。
実装完了後は、`pnpm type-check`、`pnpm check`、`pnpm test` を **必ず** 実行してください。

## コミットとPRのガイドライン
コミットは短く具体的に書き、内容は日本語が多いです（例: `JSON-LDを個人向けに調整`）。変更は 1 コミット 1 目的にまとめます。PR テンプレートはないため、概要、テスト結果、UI 変更のスクリーンショットを明記し、関連 Issue があればリンクします。

## 設定メモ
環境変数は `.env` で管理し、例は `.env.example` / `.env.sample` を参照します。機密情報はコミットせず、新たに秘匿ファイルを作る場合は `.gitignore` に追加してください。
