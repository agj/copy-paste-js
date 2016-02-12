'use strict';

var cfg = {
	utilitiesFolder: 'src/utilities/',
};

var onLoad = function (document, cb) {
	return /interactive|complete/.test(document.readyState) ? setTimeout(cb, 0) : document.addEventListener('DOMContentLoaded', cb);
};


module.exports = {
	cfg: cfg,
	onLoad: onLoad,
};
