var debounce = function debounce(secs, fn) {
	var delay = secs * 1000;
	var timeoutID = undefined;
	var exec = function exec(args) {
		return fn.apply(null, args);
	};
	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		clearTimeout(timeoutID);
		timeoutID = setTimeout(exec, delay, args);
	};
};