type Fn<T> = () => Promise<T>;

function promiseAll<T>(functions: Fn<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let count = 0;

    functions.forEach((fn, i) => {
      fn()
        .then((v) => {
          results[i] = v;
          count++;
          if (count === functions.length) resolve(results);
        })
        .catch((e) => reject(e));
    });
  });
}

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */

// ChatGPTの力を借りてようやく解けた・・・。回答を見れば意外と単純なのにくやし。
