var apply = function apply(f) {
	return function (args) {
		return f.apply(null, args);
	};
};