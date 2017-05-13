var merge = function merge(o1) {
	return function (o2) {
		var r = {};
		Object.keys(o1).forEach(function (prop) {
			return r[prop] = o1[prop];
		});
		Object.keys(o2).forEach(function (prop) {
			return r[prop] = o2[prop];
		});
		return r;
	};
};