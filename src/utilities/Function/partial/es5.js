var partial = function partial(f, args1) {
  return function () {
    return f.apply(null, args1.concat([].slice.call(arguments)));
  };
};