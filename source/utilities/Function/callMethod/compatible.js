module.exports = function callMethod(method, args) {
  return function (obj) {
    return args ? obj[method].apply(obj, args) : obj[method]();
  };
};
