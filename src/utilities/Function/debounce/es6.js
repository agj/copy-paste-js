const debounce = (secs, fn) => {
	const delay = secs * 1000;
	let timeoutID;
	const exec = (t, args) => fn.apply(t, args);
	return (...args) => {
		clearTimeout(timeoutID);
		timeoutID = setTimeout(exec, delay, this, args);
	};
};