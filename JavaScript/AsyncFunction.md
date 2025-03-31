# Async Function

## 概要

Async Function は通常の関数とは異なり、**必ず Promise インスタンスを返す関数**を定義する構文。
関数の定義に `async` キーワードをつけることで Async Function を定義できる。

```ts
async function doAsync() {
  return "値";
}

doAsync().then((value) => {
  console.log(value); // 値
});
```

この Async Function は次のように書いた場合と同じ意味になる。

```ts
function doAsync() {
  return Promise.resolve("値");
}

doAsync().then((value) => {
  console.log(value); // 値
});
```

重要なのは、**Async Function は Promise の上に作られた構文**であるという点。
そのため Async Function を理解するには、Promise を理解する必要がある。

## await 式

await は、Promise の非同期処理が完了するまで待つことができる構文である。
await を使うことで、**非同期処理を同期処理のように扱えるため、Promise チェーンで実現していた処理の流れを読みやすく書ける**。

await は次の箇所で使用できる。

- Async Function の関数直下
- ECMAScript モジュールの直下

await 式は右辺の Promise インスタンスが Fulfilled または Rejected になるまでその場で非同期処理の完了を待つ。
そして Promise インスタンスの状態が変わると、次の行の処理を再開する。

```ts
async function asyncMain() {
  // PromiseがFulfilledまたはRejectedとなるまで待つ
  await Promiseインスタンス;
  // Promiseインスタンスの状態が変わったら処理を再開する
}
```

普通の処理の流れでは、非同期処理を実行した場合にその非同期処理の完了を待つことなく、次の行（次の文）を実行する。
しかし await 式では非同期処理を実行して完了するまで、次の行（次の文）を実行しない。そのため await 式を使うことで非同期処理が同期処理のように上から下へと順番に実行するような処理順で書ける。

例えば、await を使った次のコードは、

```ts
async function asyncMain() {
  const value = await Promise.resolve(42);
  console.log(value); // 42
}

asyncMain();
```

await を使わないで書くと次のようになる。

```ts
function asyncMain() {
  return Promise.resolve(42).then((value) => {
    console.log(value); // 42
  });
}

asyncMain();
```

await を使うことで、コールバック関数を使わずに非同期処理の流れを表現できていることがわかる。

## Module 直下での await 式

前述したように、await は次の箇所で使用できる。

- Async Function の関数直下
- ECMAScript モジュールの直下

JS には実行コンテキストとして、Script と Module がある。
例えばブラウザでは、`<script>` と書けば Script として実行され、`<script type="module">` と書けば Module として実行される。

**Module として JS を実行した時のみ、トップレベル（最も外側のスコープ）においては、Async Function なしで await が使用できる**。
