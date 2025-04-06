declare global {
  interface Array<T> {
    groupBy(fn: (item: T) => string): Record<string, T[]>;
  }
}

// 最初のコード。期待通りには動くが、速度が遅く、Submit したら弾かれた
// どうやら配列を毎回作成しているのが原因ぽい・・・
Array.prototype.groupBy = function (fn: <T>(item: T) => string) {
  const result: Record<string, any[]> = {};

  for (let i = 0; i < this.length; i++) {
    const key = fn(this[i]);
    result[key] = result[key] ? [...result[key], this[i]] : [this[i]];
  }

  return result;
};

// ということで、配列を毎回再作成するのではなく、値があればその配列に push するように修正
// 破壊的だけど効率は良し
Array.prototype.groupBy = function (fn: <T>(item: T) => string) {
  const result: Record<string, any[]> = {};

  for (let i = 0; i < this.length; i++) {
    const key = fn(this[i]);
    if (result[key]) {
      result[key].push(this[i]);
    } else {
      result[key] = [this[i]];
    }
  }

  return result;
};

// 他の回答見て気づいたけど reduce でもかける(ただしforの方が早い)
Array.prototype.groupBy = function (fn: <T>(item: T) => string) {
  return this.reduce((grouped, v) => {
    const key = fn(v);

    if (grouped[key]) {
      grouped[key].push(v);
    } else {
      grouped[key] = [v];
    }

    return grouped;
  }, {});
};
