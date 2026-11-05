# バラバラロン — Official Website

Next.js App Router / TypeScript / Tailwind CSS による公式サイトの初期版です。黒・オフホワイト・赤のコラージュ、破れた紙、コピー機ノイズをCSSと独自SVGで表現しています。メンバーや活動歴などの未提供情報は登録していません。

## ローカルで確認

Node.js 20.9以上が必要です。

```sh
npm ci
npm run dev
```

http://localhost:3000 を開きます。

## 情報を更新

**`src/data/site.ts`** がサイト情報の編集場所です。空文字 `''` と空配列 `[]` は未登録を表します。

- `name`, `genre`, `description`: バンド名、ジャンル、検索結果の説明
- `url`: 公開後の完全なURL。設定するとcanonicalとOGPの基準URLに反映
- `colors`: 黒・紙・赤。変更時には文字と背景のコントラストを確認
- `profile`: 紹介文、拠点、結成年、メンバー、写真
- `music`: 音源。id、title、date（YYYY-MM-DD）、kind、任意のartwork、配信先links
- `shows`: ライブ。id、date（YYYY-MM-DD）、title、venue、performers、任意のdoors・ticketUrl
- `news`: ニュース。id、date（YYYY-MM-DD）、title、body、任意のurl
- `socials`: `{ label, url }` の配列
- `email`: 出演依頼用メールアドレス

写真は `public/images/` に入れ、`{ src: '/images/ファイル名.jpg', alt: '写真の説明', width: 元の幅, height: 元の高さ }` で登録します。Next.js Imageで最適化します。外部画像を使う場合は、Next.jsの `images.remotePatterns` に許可するホストを追加してください。

配信先・SNS・チケットのURLは `https://` または `http://` の完全なURLにします。不正なURL、未設定のURLはリンクとして表示しません。問い合わせ先・SNSが両方未設定ならCONTACTとナビゲーション項目も非表示になります。

音源とニュースは新しい順。ライブは日本時間の日付で開催前（当日を含む）と終了済みに自動分類します。開催前は近い順、終了済みは新しい順です。ページはリクエストごとに生成するため、日付変更のための再ビルドは不要です。

## 構成

- `src/app/page.tsx`: トップと全体構成
- `src/components/sections.tsx`: ABOUT / MUSIC / LIVE / NEWS / CONTACT
- `src/components/navigation.tsx`: スマートフォン用メニュー
- `src/components/art.tsx`: 独自のタイポグラフィと装飾
- `src/components/reveal.tsx`: 軽量スクロール演出
- `src/app/globals.css`: レイアウト・レスポンシブ・紙の表現
- `src/app/layout.tsx`: SEO / OGPメタデータ
- `public/og.png`: SNS共有画像
- `src/app/icon.svg`: favicon（バンド名変更時は編集）

強い点滅・音声の自動再生はありません。`prefers-reduced-motion`、キーボードフォーカス、本文スキップ、メニューの開閉状態に対応しています。JavaScript無効時も本文は表示されます。

## 検証

```sh
npm run lint
npm run typecheck
npm run build
```

ブラウザ検証を実行するには `npx playwright install chromium` を初回のみ実行し、開発サーバー起動後に `npm run test:browser` を実行します。

OGP画像をバンド名・配色の変更後に更新するには `npm run og` を実行します（Node.js 22.18以上とPlaywright Chromiumが必要）。生成した `public/og.png` もコミットしてください。`url` 未登録時のOGP基準URLにはVercelのデプロイ先URLを使用し、ローカルではlocalhostを使用します。

## Vercelで公開

1. このプロジェクトをGitHubなどのGitリポジトリへ保存。
2. Vercelの「Add New Project」からリポジトリを選択。
3. Framework PresetをNext.jsに設定し、Deploy。
4. 発行されたURLを `src/data/site.ts` の `url` に登録し、再デプロイ。

ビルドは `npm run build`、出力先はNext.jsの既定値。データベース・APIキー・環境変数は不要です。ドメイン設定や一般公開はまだ行っていません。
