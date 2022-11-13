export default <Args extends unknown[], R>(f: (...args: Args) => R) =>
  (...args: Args): R =>
    f(...args);
