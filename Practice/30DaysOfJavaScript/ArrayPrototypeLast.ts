// NOTE: - TypeScript で組み込み型（Arrayなど）を拡張する場合は、global スコープに明示的に型を追加する必要がある
declare global {
  interface Array<T> {
    last(): T | -1;
  }
}

Array.prototype.last = function () {
  return this.length === 0 ? -1 : this[this.length - 1];
};

/**
 * const arr = [1, 2, 3];
 * arr.last(); // 3
 */
