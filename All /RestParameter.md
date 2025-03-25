# レストパラメータ(RestParameter)

## 概要

レストパラメータを使うと、関数が**数の決まっていない引数を配列として受け入れる**ことができる。

```ts
function sum(...theArgs: number[]) {
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total;
}

console.log(sum(1, 2, 3));
// Expected output: 6

console.log(sum(1, 2, 3, 4));
// Expected output: 10
```

## 参考

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/rest_parameters
