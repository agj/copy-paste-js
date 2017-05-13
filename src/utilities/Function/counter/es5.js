var counter = function counter() {
  var i = 0;return function () {
    return i++;
  };
};