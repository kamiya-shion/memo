type Fn = (accum: number, curr: number) => number;

function reduce(nums: number[], fn: Fn, init: number): number {
  let total = init;
  nums.forEach((num) => {
    total = fn(total, num);
  });

  return total;
}
