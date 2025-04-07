type MultiDimensionalArray = (number | MultiDimensionalArray)[];

// 初回コード。通るけど遅すぎるしひどい・・・。
const traverse = (arr: MultiDimensionalArray) => {
  const results: MultiDimensionalArray = [];

  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    if (Array.isArray(v)) {
      results.push(...v);
    } else {
      results.push(v);
    }
  }
  return results;
};

var flat = function (
  arr: MultiDimensionalArray,
  n: number
): MultiDimensionalArray {
  for (let i = 0; i < n; i++) {
    arr = traverse(arr);
  }

  return arr;
};

// 改善ver
// 自力では改善できず、ChatGPT先生にヒントもらいながらやった
var flatV2 = function (
  arr: MultiDimensionalArray,
  n: number
): MultiDimensionalArray {
  const results: MultiDimensionalArray = [];

  for (const item of arr) {
    if (Array.isArray(item) && n > 0) {
      results.push(...flat(item, n - 1));
    } else {
      results.push(item);
    }
  }

  return results;
};
