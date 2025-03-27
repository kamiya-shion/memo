# レスト構文(Rest Syntax)

## 概要

レスト構文(Rest Syntax)。
関数の引数やオブジェクト、配列から**残りの要素を受け取る**ときに使用する。

### 関数の関数の可変長引数

レストパラメータ(RestParameter)ともいう。
関数が**数の決まっていない引数を配列として受け入れる**ことができる。

```ts
const hello = (greeting: string, ...names: string[]) => {
  console.log(`${greeting}, ${names.join(", ")}!`);
};

hello("Hello", "Joe", "Shine", "Tier"); // "Hello, Joe, Shine, Tier!"
```

### オブジェクトの分割代入

```ts
const person = { name: "Bob", age: 30, city: "Tokyo" };
const { name, ...rest } = person;

console.log(name); // Bob
console.log(rest); // { "age": 30, "city": "Tokyo" }
```

### 配列の分割代入

```ts
const [first, ...rest] = [10, 20, 30, 40];

console.log(first); // 10
console.log(rest); // [20, 30, 40]
```

## おまけ：スプレッド構文

「...」は、上記レスト構文以外に、スプレッド構文(Spread Syntax)という使い方もある。
スプレッド構文は、**配列やオブジェクトを展開**するために使う。

👇 配列の展開

```ts
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]
```

👇 オブジェクトの展開

```ts
const obj1 = { name: "Alice", age: 25 };
const obj2 = { ...obj1, country: "Japan" }; // { name: "Alice", age: 25, country: "Japan" }
```

## 参考

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/rest_parameters
