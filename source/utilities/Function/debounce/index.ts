export default <T>(secs: number, fn: (...args: Array<T>) => unknown) => {
  const delay = secs * 1000;
  let timeoutID;
  const exec = (args: Array<T>) => fn.apply(null, args);
  return (...args: Array<T>): void => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(exec, delay, args);
  };
};
