var log = function log() {
  for (var _len = arguments.length, msg = Array(_len), _key = 0; _key < _len; _key++) {
    msg[_key] = arguments[_key];
  }

  return function () {
    return console.log.apply(console, msg);
  };
};