# valueOf とは

## 概要

- valueOf() は、オブジェクトのプリミティブ値を返すメソッド
- JS の全てのオブジェクトはこのメソッドを継承する

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf

## 動き

デフォルトではそのままオブジェクト自身を返す。

```ts
const obj = {
  a: 1,
};

console.log(obj.valueOf()); // => { a: 1 }
```

数値や文字の場合も実際のプリミティブ値が返される。

```ts
const num = 32;

console.log(num.valueOf()); // 32

const str = "hello";

console.log(str.valueOf()); // "hello"
```

カスタムオブジェクトでオーバーライド可能。
**`+` 演算子を使うと自動的に `valueOf` が呼ばれるため、`myObj + 1` でも動作する**。

```ts
const myObj = {
  value: 100,
  valueOf() {
    return this.value;
  },
};

console.log(myObj + 1); // => 101
```

ちなみにプリミティブ値にも、valueOf は存在するが...

```ts
const str = "hello";

console.log(str.valueOf()); // hello
```

オーバーライドはできない。

```ts
const str = "hello";

str.valueOf = function () {
  return "こんちわ";
};

console.log(str.valueOf()); // ERROR: Cannot create property 'valueOf' on string 'hello'
```

hello はただのプリミティブ値であり、JS ではプリミティブにメソッドを呼ぶ時、一時的にラッパーオブジェクト（`new String("hello")`）を作る。
`str.valueOf = ...` は、プリミティブにプロパティをつけようとしているため TS ではエラーになる（ちな、JS では動いた）。

ただしくオーバーライドしたいなら、ラッパーオブジェクトを使う。

```ts
const str = new String("hello");

str.valueOf = function () {
  return "こんちわ";
};

console.log(str.valueOf()); // こんちわ
```
