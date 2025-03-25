# クロージャー

## クロージャーとは

2 つ意味がある。

- あるコードブロック内で定義された関数などが、そのブロックをスコープとする変数などを参照できること
- また、そのような機能利用してブロック内部で定義された関数のこと

JavaScript では、関数が定義されたスコープの環境を記憶し続けるため、関数を実行するたびに異なる「状態」を持った関数を作れる。
どういうことか。下記の例をみてみる。

```ts
function createCounter() {
  let count = 0; // 外側の変数（クロージャーによって保持される）

  return function () {
    count++; // 外側のスコープの変数にアクセス
    console.log(count);
  };
}

const counter = createCounter(); // `createCounter` の実行が終わる
counter(); // 1
counter(); // 2
counter(); // 3
```

ポイントは、createCounter() の実行が終わった後も、counter に保持された関数は count を覚えていて、counter() を呼ぶたびに count の値が増えていく点。

このように、クロージャーは「関数が定義された時のスコープの変数を保持し続ける機能」であり、状態を持った関数を作るのに便利である。

## 参考

https://e-words.jp/w/%E3%82%AF%E3%83%AD%E3%83%BC%E3%82%B8%E3%83%A3.html
