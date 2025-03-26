type Counter = {
  increment: () => number;
  decrement: () => number;
  reset: () => number;
};

function createCounter(init: number): Counter {
  const initValue = init;

  return {
    increment: () => ++init,
    decrement: () => --init,
    reset: () => (init = initValue), // 代入式
  };
}

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */
