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

オブジェクトの展開では、同じの名前のプロパティが検出された場合、プロパティは最後に割り当てられた値で上書きする。

```ts
const obj1 = { id: 2, x: 3, y: 6 };
const obj2 = { id: 2, x: 10, y: 20 };

const result = { ...obj1, ...obj2 };

console.log(result); // { "id": 2, "x": 10, "y": 20 }
```

参考：
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax#:~:text=bar%22%2C%20x%3A%2042%20%7D-,%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%AE%E4%B8%8A%E6%9B%B8%E3%81%8D,-%E3%81%82%E3%82%8B%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%8C

## 参考

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/rest_parameters
