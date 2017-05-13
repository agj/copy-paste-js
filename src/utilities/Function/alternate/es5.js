var alternate = function alternate(f, g) {
	var state = false;
	return function () {
		state = !state;
		return state ? f.apply(undefined, arguments) : g.apply(undefined, arguments);
	};
};