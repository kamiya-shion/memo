type F = (x: number) => number;

function compose(functions: F[]): F {
  return function (x) {
    let temp = x;
    for (const fn of functions.reverse()) {
      temp = fn(temp);
    }
    return temp;
  };
}

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */
