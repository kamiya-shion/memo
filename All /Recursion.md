# 再帰処理(Recursion)

## 概要

プログラム内で自己呼び出しを行うアルゴリズムの手法。

## 例

### Example1: カウントダウン関数

```ts
const countdown = (count: number) => {
  if (count >= 0) {
    console.log(count);
    countdown(count - 1);
  }
};

countdown(3); // 3, 2, 1, 0
```

### Example2: 階乗

```ts
const factorial = (num: number): number => {
  if (num === 0) return 1;
  if (num === 1) return num;

  return num * factorial(num - 1);
};

factorial(5); // 120
```

### Example3: ネストされた配列の中のすべての数の合計

```ts
const sumNested = (numArr: any[]) => {
  return numArr.reduce((sum, item) => {
    sum += Array.isArray(item) ? sumNested(item) : item;
    return sum;
  }, 0);
};

const result = sumNested([1, [2, [3, 4]], 5]);
console.log(result); // 15
```
