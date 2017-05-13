var append = function append(a) {
  return function (b) {
    return b + a;
  };
};