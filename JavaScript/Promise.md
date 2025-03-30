# Promise

## 概要

Promise は、**非同期処理の状態や結果を表現するビルトインオブジェクト**。
非同期処理は Promise のインスタンスを返し、その Promise インスタンスには状態変化をした際に呼び出されるコールバック関数を登録できる。

以下の例を見ればわかりやすい。
`asyncPromiseTask` は Promise オブジェクトを返す。
`asyncPromiseTask` を呼び出す際に、**非同期処理に成功した際の処理を then()に登録し、失敗した際の処理を catch()に登録する**。

```ts
// asyncPromiseTask関数は、Promiseインスタンスを返す
const asyncPromiseTask = () => {
  return new Promise((resolve, reject) => {
    // さまざまな非同期処理を行う
    // 非同期処理に成功した場合は、resolveを呼ぶ
    // 非同期処理に失敗した場合は、rejectを呼ぶ
  });
};
// asyncPromiseTask関数の非同期処理が成功した時、失敗した時に呼ばれる処理をコールバック関数として登録する
asyncPromiseTask()
  .then(() => {
    // 非同期処理が成功したときの処理
  })
  .catch(() => {
    // 非同期処理が失敗したときの処理
  });
```

同期的な関数では、関数を実行するとすぐ結果がわかるが、非同期な関数では関数を実行してもすぐに結果がわからない。
そのため、非同期な関数は Promise という非同期処理の状態をラップしたオブジェクトを返し、その**結果が決まったら登録しておいたコールバック関数へ結果を渡す**という仕組みになっている。

## 具体例

```ts
const dummyFetch = (path: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/success")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("NOT FOUND"));
      }
    }, 1000 * Math.random());
  });
};

dummyFetch("/success/data")
  .then((response) => {
    console.log("SUCCESS!!");
    console.log(response);
  })
  .catch((error) => {
    console.log("FAILED...");
    console.log(error);
  });

// SUCCESS!!
// { "body": "Response body of /success/data" }

dummyFetch("/failure/data")
  .then((response) => {
    console.log("SUCCESS!!");
    console.log(response);
  })
  .catch((error) => {
    console.log("FAILED...");
    console.log(error);
  });

// FAILED...
// NOT FOUND
```

## Promise の状態

Promise インスタンスには、内部的に次の 3 つの状態が存在する。

- Fulfilled
  resolve した時の状態。この時、onFulfilled が呼ばれる。
  参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#parameters

- Rejected
  reject または例外が発生した時の状態。この時、onRejected が呼ばれる。
  参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch#onrejected

- Pending
  Fulfilled または Rejected ではない状態。
  `new Promise` でインスタンスを作成した時の初期状態。

これらの状態は ECMAScript の仕様として決められている内部的な状態で、この状態を Promise のインスタンスから取り出す方法はない。
しかし、Promise について理解するのに役立つ。

Promise インスタンスの状態は作成時に Pending となり、一度でも Fulfilled または Rejected へ変化すると、それ以降状態は変化しなくなる。
そのため、Fulfilled または Rejected の状態であることを Settled（不変）と呼びます。

一度でも Settled（Fulfilled または Rejected）となった Promise インスタンスは、それ以降別の状態には変化しない。

以下の例を見るとわかりやすい。
resolve を呼び出した後に reject を呼び出しても、その Promise インスタンスは最初に呼び出した resolve によって Fulfilled のままとなる。

```ts
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
    // NOTE: - すでにresolveされているため無視される
    reject(new Error("エラー"));
  }, 16);
});

promise.then(
  () => {
    console.log("Fulfilled!");
  },
  (error) => {
    // NOTE: - この行は呼び出されない
  }
);
```

## Promise チェーン

非同期処理が終わったら次の非同期処理というように、複数の非同期処理を順番に扱いたい場合がある。
Promise では複数の非同期処理からなる一連の非同期処理を Promise チェーンという仕組みで実現できる。

この仕組みのキーとなるのが、**then や catch メソッドは常に新しい Promise インスタンスを作成して返すという仕様**である。
参考：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#%E8%BF%94%E5%80%A4

次のコードでは、then メソッドで Promise チェーンをしている。
Promise が失敗（Rejected）しない限り、順番に then メソッドで登録した成功時のコールバックを呼び出す。

```ts
Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  });

// 1
// 2
```

また、Promise チェーンで失敗を catch メソッドなどで一度キャッチすると、次に呼ばれるのは成功時の処理となる。
これは、**then や catch メソッドは Fulfilled 状態の Promise インスタンスを作成して返す**ためである。
そのため、一度キャッチするとそこからは次の then で登録した処理が呼ばれる Promise チェーンに戻る。

```ts
Promise.reject(new Error("エラー"))
  .catch((error) => {
    console.error(error); // Error: エラー
  })
  .then(() => {
    console.log("thenのコールバック関数が呼び出される");
  });
```

## Promise チェーンで値を返す

Promise チェーンではコールバックで返した値を次のコールバックへ引数として渡せる。

```ts
Promise.resolve(1)
  .then((value) => {
    console.log(value); // 1
    return value * 2;
  })
  .then((value) => {
    console.log(value); // 2
    return value * 2;
  })
  .then((value) => {
    console.log(value); //  4
  })
  .then((value) => {
    console.log(value); // undefined
  });
```

また、Promise チェーンで一度キャッチすると、次に呼ばれるのは成功時の処理となる。
そのため、catch メソッドで返した値は次の then メソッドのコールバック関数に引数として渡される。

```ts
Promise.reject(new Error("失敗"))
  .catch((error) => {
    return 1;
  })
  .then((value) => {
    console.log(value); // 1
    return value * 2;
  })
  .then((value) => {
    console.log(value); // 2
  });
```

## コールバック関数で Promise インスタンスを返す

Promise チェーンで一度キャッチすると、次に呼ばれるのは成功時の処理（then メソッド）であるのは前述した通り。
これは、コールバック関数で任意の値を返すとその値で resolve された Fulfilled 状態の Promise インスタンスを作成するためである。

しかし、**コールバック関数で Promise インスタンスを返した場合は例外的に異なる**。
コールバック関数で Promise インスタンスを返した場合は、同じ状態を持つ Promise インスタンスが then や catch メソッドの返り値となる。
つまり、then メソッドで Rejected 状態の Promise インスタンスを返した場合は、次に呼ばれるのは失敗時の処理（catch メソッド）である。

```ts
Promise.resolve()
  .then(function onFulfilledA() {
    return Promise.reject(new Error("失敗"));
  })
  .then(function onFulfilledB() {
    console.log("success 1");
  })
  .catch(function onRejected(error) {
    console.log(error.message);
  })
  .then(function onFulfilledC() {
    console.log("success 2");
  });

// 失敗
// success 2
```

## Promise.all で複数の Promise をまとめる

Promise.all は、Promise インスタンスの配列を受け取り、新しい Promise インスタンスを返す。

その配列のすべての Promise インスタンスが Fulfilled となった場合は、返り値の Promise インスタンスも Fulfilled となる。
一方で、一つでも Rejected となった場合は、返り値の Promise インスタンスも Rejected となる。

Promise.all.then メソッドで登録したコールバック関数には、Promise の結果をまとめた配列が渡される。
この時の配列要素の順番は Promise.all メソッドに渡した配列要素の順番と同じになる。

```ts
function delay(timeoutMs: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(timeoutMs);
    }, timeoutMs);
  });
}
const promise1 = delay(1000);
const promise2 = delay(3000);
const promise3 = delay(2000);

Promise.all([promise1, promise2, promise3]).then(function (values) {
  console.log(values); // => [1000, 3000, 2000]
});
```

ちなみに、渡した Promise が一つでも Rejected となった場合は失敗時の処理が呼び出される。この時、then メソッドは呼ばれない点に注意する

## Promise.race

Promise.all メソッドは複数の Promise がすべて完了するまで待つ処理だった。
Promise.race は、**複数の Promise を受け取るが、Promise が 1 つでも完了した時点で次の処理を実行する**。

Promise.race メソッドは Promise インスタンスの配列を受け取り、新しい Promise インスタンスを返す。
この新しい Promise インスタンスは、配列の中で一番最初に Settled 状態となった Promise インスタンスと同じ状態になる。

- 配列の中で一番最初に Settled となった Promise が Fulfilled の場合は、新しい Promise インスタンスも Fulfilled になる
- 配列の中で一番最初に Settled となった Promise が Rejected の場合は、新しい Promise インスタンスも Rejected になる

つまり、複数の Promise による非同期処理を同時に実行して競争（race）させて、**一番最初に完了した Promise インスタンスに対する次の処理を呼び出す**。

```ts
function delay(timeoutMs: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(timeoutMs);
    }, timeoutMs);
  });
}

const racePromise = Promise.race([
  delay(3000),
  delay(1000),
  delay(6000),
  delay(10000),
]);

racePromise.then((value) => {
  console.log(value); // 1000
});
```

ここでのポイントは、Promise インスタンスは**一度 Settled（Fulfilled または Rejected）となると、それ以降は状態も変化せず then のコールバック関数も呼び出さない**という点。
そのため、racePromise は何度も resolve されるが、初回以外は無視されるため then のコールバック関数は一度しか呼び出されない。

実用的な例としては、Promise.race メソッドを使用することでタイムアウトが実装できる。
タイムアウトとは、一定時間経過しても処理が終わっていないならエラーとして扱う処理のこと。

```ts
function timeout(timeoutMs: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Timeout: ${timeoutMs}ミリ秒経過`));
    }, timeoutMs);
  });
}

function dummyFetch(path: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/resource")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("NOT FOUND"));
      }
    }, 1000 * Math.random());
  });
}

Promise.race([dummyFetch("/resource/data"), timeout(500)])
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error.message);
  });

//
// Success ver
//
// { "body": "Response body of /resource/data" }

//
// Fail ver
//
// Timeout: 500ミリ秒経過
```

今まで見てきたように、Promise を使うことで非同期処理のさまざまなパターンが形成できる。

一方で、Promise はただのオブジェクトであるため、非同期処理間の連携をするには Promise チェーンのように少し特殊な書き方や見た目になる。

この不格好な見た目を解消するのが、Async Function と呼ばれる構文である。
Async Function については下記ページを参照。
