class TimeLimitedCache {
  constructor() {}

  #cache: Map<number, { value: number; timeoutID: NodeJS.Timeout }> = new Map();

  set(key: number, value: number, duration: number): boolean {
    // 有効期限が切れていない同じキーがあるならTrue,ないならFalse
    const exists = this.#cache.has(key);

    // NOTE: - 同じキーが存在するなら古いタイムアウト時間を削除し上書き
    if (exists) clearTimeout(this.#cache.get(key)?.timeoutID);

    const timeoutID = setTimeout(() => this.#cache.delete(key), duration);

    this.#cache.set(key, { value, timeoutID });

    return exists;
  }

  get(key: number): number {
    return this.#cache.get(key)?.value ?? -1;
  }

  count(): number {
    return this.#cache.size;
  }
}

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */

// 一番早いコードを書いていた人と考え方や実装が同じで安心した。
