'use strict';

var cfg = {
	utilitiesFolder: 'src/utilities/',
};

var onLoad = function (document, cb) {
	return /interactive|complete/.test(document.readyState) ? setTimeout(cb, 0) : document.addEventListener('DOMContentLoaded', cb);
};

var toArray = Function.prototype.call.bind([].slice);

var log = function (pass) {
	console.log(pass);
	return pass;
};


module.exports = {
	cfg: cfg,
	onLoad: onLoad,
	log: log,
};
