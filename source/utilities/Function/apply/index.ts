export default <Args extends unknown[]>(f: (...args: Args) => unknown) =>
  (args: Args) =>
    f(...args);
