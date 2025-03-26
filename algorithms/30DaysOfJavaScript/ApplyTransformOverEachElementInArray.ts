function map(arr: number[], fn: (n: number, i: number) => number): number[] {
  const result = arr.reduce((acc, cur, idx) => {
    return [...acc, fn(cur, idx)];
  }, [] as number[]);

  return result;
}
