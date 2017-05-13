var gte = function gte(a) {
  return function (b) {
    return b >= a;
  };
};