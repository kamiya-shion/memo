type Fn = (n: number, i: number) => any;

function filter(arr: number[], fn: Fn): number[] {
  return arr.reduce((numArr, num, idx) => {
    return fn(num, idx) ? [...numArr, num] : numArr;
  }, [] as number[]);
}
