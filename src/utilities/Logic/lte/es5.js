var lte = function lte(a) {
  return function (b) {
    return b <= a;
  };
};