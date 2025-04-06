type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };

type Obj = Record<string, JSONValue> | Array<JSONValue>;

// 以下だと　splice　で元の配列を破壊している(関数の副作用)
// つまり chunk 実行後に、arr を見てみると空になっているのがわかる
function chunk(arr: Obj[], size: number): Obj[][] {
  const results: Obj[][] = [];
  const length = Math.ceil(arr.length / size);

  for (let i = 0; i < length; i++) {
    results.push(arr.splice(0, size));
  }

  return results;
}

// slice を使用して元の配列を破壊しないパターンが良い
function chunk2(arr: Obj[], size: number): Obj[][] {
  const results: Obj[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    results.push(arr.slice(i, i + size));
  }

  return results;
}
