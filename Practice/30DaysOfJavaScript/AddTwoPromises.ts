// 参考ページ
// All/Sync-Async.md
// JavaScript/Promise.md
// JavaScript/AsyncFunction.md

type P = Promise<number>;

async function addTwoPromises(promise1: P, promise2: P): P {
  const result1 = await promise1;
  const result2 = await promise2;

  return result1 + result2;
}

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */
