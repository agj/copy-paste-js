module.exports = function partialR(f, args1) {
  return function () {
    var args2 = [].slice.apply(arguments);
    return f.apply(null, args2.concat(args1));
  };
};
