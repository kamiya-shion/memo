## 同期処理と非同期処理

コードの評価の仕方として、**同期処理**と**非同期処理**という大きな分類がある。

同期処理は、コードを順番に処理していき、一つの処理が終わるまで次の処理は行わない。
実行している処理は一つだけなので、直感的であるが、実行コストが大きい処理がある場合その処理が終わるまで次の処理へ進むことができないため問題がある。

これはブラウザで大きな問題となる。なぜなら、JS は基本的にブラウザのメインスレッド（UI スレッド）で実行されるためである。
メインスレッドが JS の処理で占有されると、表示が更新されなくなりフリーズしたようになる。

非同期処理は、非同期処理が終わるのを待たずに次の処理を評価する。
実はこの非同期処理は**メインスレッド**で実行される。そのため実行コストが大きい処理が同期的に行われている場合、非同期処理であろうとその影響を受ける。

このことを理解するには以下のコードを実行するのが早い。
非同期処理がメインスレッド以外のスレッドで実行されるなら、同期的に実行される重い処理（blockTime）の影響を受けないはずである
つまり、1 秒を待たずに taskAsync が実行されるはずである。

しかし taskAsync が実行されるのは 1 秒以上かかることがわかる。同期的にブロックする処理によって非同期処理のタスクの実行も後ろにずれてしまうためである。

このように、**非同期処理も同期処理の影響を受ける**ことから、同じメインスレッドで実行されることがわかる。

```ts
const taskA = () => {
  console.log("Task A called at", Date.now());
};

const taskB = () => {
  console.log("Task B called at", Date.now());
};

const taskAsync = () => {
  console.log("Async Task called at", Date.now());
};

const blockTime = (timeout: number) => {
  const startTime = Date.now();

  while (true) {
    const diffTime = Date.now() - startTime;

    if (diffTime >= timeout) {
      return;
    }
  }
};

const startTime = Date.now();
taskA();
setTimeout(() => {
  const endTime = Date.now();
  taskAsync();
  console.log("finished at", endTime - startTime);
}, 10);
blockTime(1000);
taskB();
```

## 並行処理（concurrent）と並列処理（Parallel）

JS では一部の例外を除き、非同期処理が並行処理として扱われる。

並行処理とは、**処理を一定の単位ごとに分けて処理を切り替えながら実行する**こと。
そのため、非同期処理の実行前にとても重たい処理があると、非同期処理の実行が遅れてしまう（上記例で示したとおり）。

ただし、非同期処理の中にもメインスレッドとは別のスレッドで実行できる API が存在する。ブラウザでは Web Worker がそれにあたる。
この Web Worker における非同期処理は並列処理と呼ばれる。
並列処理とは、**排他的に複数の処理を同時に実行する**こと。

## 非同期処理と例外処理

同期処理では、`try...catch` 構文を使うことで同期的に発生した例外がキャッチできる。

```ts
try {
  throw new Error("Error occurred!");
} catch (e) {
  console.log("caught error!");
}

console.log("done.");

// caught error!
// done.
```

一方非同期処理では、`try...catch` 構文を使っても非同期的に発生した例外をキャッチできない。

try ブロックはそのブロック内で発生した例外をキャッチする構文である。
setTimeout 関数で登録されたコールバック関数が実際に実行されて例外を投げるのは、すべての同期処理が終わった後となる。
つまり、try ブロックで例外が発生しうるとマークした範囲外で例外が発生する。

```ts
try {
  setTimeout(() => {
    throw new Error("Error occurred!");
  }, 10);
} catch (e) {
  console.log("caught error!");
}

console.log("done.");

// done.
```

そのため、以下のようにコールバック関数内で同期的なエラーとしてキャッチする必要がある。

```ts
setTimeout(() => {
  try {
    throw new Error("Error occurred!");
  } catch (e) {
    console.log("caught error!");
  }
}, 10);

console.log("done.");

// done.
// caught error!
```

このようにすればコールバック関数名でエラーをキャッチできるが、**非同期処理の外からは非同期処理の中で例外が発生したかがわからない**。
非同期処理の外から例外が起きたことを知るためには、非同期処理の中で例外が発生したことを非同期処理の外へ伝える方法が必要。

非同期処理で発生した例外の扱い方については主に、Promise、Async Function という 2 つのやり方がある（JS）。
詳細は以下を参考にする。

JavaScript/Promise.ts

## 参考

https://jsprimer.net/basic/async/#async-handling
