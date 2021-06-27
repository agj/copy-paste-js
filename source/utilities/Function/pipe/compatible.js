module.exports = function pipe() {
  var fs = [].slice.apply(arguments);
  return fs.reduce(function (left, right) {
    return function () {
      return right(left.apply(void 0, arguments));
    };
  });
};
