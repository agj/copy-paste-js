var uniq = function uniq(list) {
	var seen = [];
	return list.filter(function (item) {
		return seen.some(function (a) {
			return a === item;
		}) ? false : (seen.push(item), true);
	});
};