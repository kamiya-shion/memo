# zod とは

zod の使い方は調べればすぐに出てくるので、ここではなぜ Zod を使うのか。Zod の使い所はどこなのか整理する。

## 概要

Zod とは、TypeScript ファーストのスキーマ宣言およびバリデーションライブラリ。

Zod を使用すると、型安全な方法でデータ構造を定義し、それに基づいてデータを検証できる。

**「信頼できないデータの検証」** に使うと効果的！

## 使い所

1. API レスポンスのバリデーション

   → サーバーから返ってきた JSON が「期待通りの構造」かを確認

   理由：フロントエンドは API を信頼しすぎないほうが安全。バックエンドのバグや仕様変更に備えるため。

2. フォームの入力チェック

   → React Hook Form + Zod での入力バリデーション

   理由：Zod は型とバリデーションを一緒に扱えるので型安全で便利

3. URL クエリパラメータや localStorage の値など、外部入力のバリデーション

   → ユーザーやブラウザが勝手に変えられるので、安全性の担保が必要

4. 型変換が必要なケース

   例："123" → 数値 123 に変換しつつバリデーションしたいとき

   Zod には z.coerce.number() のような coercion（強制変換）機能もある

## 過剰に使わなくてもよいケース

1. 完全に型で保証される静的データ（内部で作ったデータなど）

   → 自分のコード内で作っている、型が TS 上で保証されているデータには Zod のバリデーションは不要

## Example

API レスポンスを Zod で検証する例。

```ts
import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

const fetchUser = async () => {
  const res = await fetch("/api/user");
  const data = await res.json();

  const result = userSchema.safeParse(data);
  if (!result.success) {
    console.error("Invalid API response", result.error);
    throw new Error("Unexpected API response");
  }

  return result.data; // 型安全に扱える
};
```

## まとめ

Zod は「信頼できない外部からのデータを、型安全に扱いたいとき」に使うのが基本。
