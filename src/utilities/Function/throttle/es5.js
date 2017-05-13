var throttle = function throttle(secs, fn) {
	var interval = secs * 1000;
	var last = 0;
	return function () {
		var now = Date.now();
		if (now > last + interval) {
			last = now;
			fn.apply(undefined, arguments);
		}
	};
};