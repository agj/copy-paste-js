export const complement =
  (f) =>
  (...args) =>
    !f(...args);
