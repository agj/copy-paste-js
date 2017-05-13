var pipe = function pipe() {
  for (var _len = arguments.length, fs = Array(_len), _key = 0; _key < _len; _key++) {
    fs[_key] = arguments[_key];
  }

  return fs.reduce(function (left, right) {
    return function () {
      return right(left.apply(undefined, arguments));
    };
  });
};