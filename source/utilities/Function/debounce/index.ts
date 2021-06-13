const debounce = (secs, fn) => {
	const delay = secs * 1000;
	let timeoutID;
	const exec = (args) => fn.apply(null, args);
	return (...args) => {
		clearTimeout(timeoutID);
		timeoutID = setTimeout(exec, delay, args);
	};
};