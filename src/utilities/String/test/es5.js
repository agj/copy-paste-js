var test = function test(regex) {
  return function (text) {
    return regex.test(text);
  };
};