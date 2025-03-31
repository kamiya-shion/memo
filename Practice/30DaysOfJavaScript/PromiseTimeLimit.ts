type Fn = (...params: any[]) => Promise<any>;

const timeout = (timeoutMs: number) =>
  new Promise((_, reject) => {
    setTimeout(() => reject(`Time Limit Exceeded`), timeoutMs);
  });

const timeLimit = (fn: Fn, t: number): Fn => {
  return async function (...args) {
    return Promise.race([timeout(t), fn(...args)]);
  };
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */
