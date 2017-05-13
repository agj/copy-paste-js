var get = function get(prop) {
  return function (obj) {
    return obj[prop];
  };
};