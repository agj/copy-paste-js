module.exports = function log() {
  var msg = [].slice.apply(arguments);
  return function (arg) {
    console.log.apply(console, arg === undefined ? msg : msg.concat([arg]));
    return arg;
  };
};
