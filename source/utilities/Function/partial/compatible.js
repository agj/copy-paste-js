module.exports = function partial(f, args1) {
  return function () {
    var args2 = [].slice.apply(arguments);
    return f.apply(null, args1.concat(args2));
  };
};
