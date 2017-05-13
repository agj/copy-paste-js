var makeEl = function makeEl(tag, attrs) {
	var children = [].slice.call(arguments, 2);
	var el = document.createElement(tag);
	if (attrs) Object.keys(attrs).forEach(function (attr) { el.setAttribute(attr, attrs[attr]) });
	children.map(function (obj) {
		return typeof obj === 'string' ? document.createTextNode(obj) : obj;
	}).forEach(function (node) { el.appendChild(node) });
	return el;
};