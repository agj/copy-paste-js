module.exports = function debounce(secs, fn) {
  var delay = secs * 1000;
  var timeoutID;

  var exec = function exec(args) {
    return fn.apply(null, args);
  };

  return function () {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(exec, delay, arguments);
  };
};
