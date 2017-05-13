var not = function not(f) {
  return function () {
    return !f.apply(undefined, arguments);
  };
};