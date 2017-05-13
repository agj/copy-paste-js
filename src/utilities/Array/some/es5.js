var some = function some(p) {
  return function (list) {
    return list.some(p);
  };
};