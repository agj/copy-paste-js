export const partial =
  (f, args1) =>
  (...args2) =>
    f.apply(null, args1.concat(args2));
