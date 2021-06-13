export const partialR =
  (f, args1) =>
  (...args2) =>
    f.apply(null, args2.concat(args1));
