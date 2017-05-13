var isIn = function isIn(list) {
  return function (obj) {
    return list.some(function (a) {
      return a === obj;
    });
  };
};