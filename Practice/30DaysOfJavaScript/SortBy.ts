type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };

type Fn = (value: JSONValue) => number;

function sortBy(arr: JSONValue[], fn: Fn): JSONValue[] {
  return arr.sort((a, b) => fn(a) - fn(b));
}

// fn()の結果をKeyに、配列要素をValueにしたオブジェクトの配列を作成してそれを最後に
// Valueだけの配列にして返す実装をしていたけど、実際sortだけでいいやんってなった(俺ナイス閃き)
