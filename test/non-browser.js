'use strict';

var fs = require('fs');
var R = require('ramda');

var general = require('./general.js');
var cfg = general.cfg;


var utilities = R.unnest(
	fs.readdirSync(cfg.utilitiesFolder)
	.filter(general.isDirectory(cfg.utilitiesFolder))
	.filter(R.complement(R.equals('Browser')))
	.map( function (dir) {
		return fs.readdirSync(cfg.utilitiesFolder + dir)
			.filter(general.isDirectory(cfg.utilitiesFolder + dir + '/'))
			.map(R.pair(dir));
	})
);

// console.log(utilities);

utilities.forEach(R.apply(function (group, name) {
	general.executeTestMaybe(group, name, 6);
	general.executeTestMaybe(group, name, 5);
}));

