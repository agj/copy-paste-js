var prepend = function prepend(a) {
  return function (b) {
    return a + b;
  };
};