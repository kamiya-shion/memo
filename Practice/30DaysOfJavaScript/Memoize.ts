type Fn = (...params: number[]) => number;

function memoize(fn: Fn): Fn {
  const history = new Map();

  return function (...args) {
    const key = args.join("-");
    const value = history.get(key);

    if (value !== undefined) return value;

    const result = fn(...args);
    history.set(key, result);
    return result;
  };
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */
