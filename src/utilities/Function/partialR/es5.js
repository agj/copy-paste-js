var partialR = function partialR(f, args1) {
  return function () {
    for (var _len = arguments.length, args2 = Array(_len), _key = 0; _key < _len; _key++) {
      args2[_key] = arguments[_key];
    }

    return f.apply(null, args2.concat(args1));
  };
};