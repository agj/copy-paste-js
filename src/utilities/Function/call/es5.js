var call = function call(f) {
  return function () {
    return f.apply(undefined, arguments);
  };
};