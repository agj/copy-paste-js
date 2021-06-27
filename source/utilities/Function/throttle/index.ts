export default <T>(secs: number, fn: (...args: Array<T>) => unknown) => {
  const waitTime = secs * 1000;
  let last = 0;
  return (...args: Array<T>): void => {
    const now = Date.now();
    if (now > last + waitTime) {
      last = now;
      fn(...args);
    }
  };
};
