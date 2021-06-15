module.exports = function apply(f) {
  return function (args) {
    return f.apply(void 0, args);
  };
};
