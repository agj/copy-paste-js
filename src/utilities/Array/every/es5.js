var every = function every(p) {
  return function (list) {
    return list.every(p);
  };
};