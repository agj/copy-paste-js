'use strict';

// Config.

var cfg = {
	utilitiesFolder: 'src/utilities/',
};


// Requires.

var fs = require('fs');
var R = require('ramda');
var test = require('tape-catch');
var babel = require('babel-core');
var acorn = require('acorn');
var escodegen = require('escodegen');


// Utils.

var isDirectory = function (parent) {
	return function (dir) {
		return fs.statSync(parent + dir).isDirectory();
	};
};

var utilityFilename = function (group, name, esVersion) {
	return group + '/' + name + '/es' + esVersion + '.js';
};
var testFilename = function (group, name) {
	return group + '/' + name + '/test.js';
};
var utilityHasVersion = function (group, name, esVersion) {
	return fs.existsSync(cfg.utilitiesFolder + utilityFilename(group, name, esVersion));
};

var loadJS = function (group, name, esVersion) {
	var dirfile = cfg.utilitiesFolder + utilityFilename(group, name, esVersion);
	var code = fs.readFileSync(dirfile, 'utf8');
	var ast =
		acorn.parse(code, { ecmaVersion: esVersion })
		.body
		.filter(R.propEq('type', 'VariableDeclaration'))
		[0]
		.declarations
		[0]
		.init;
	code = escodegen.generate(ast);
	return eval(babel.transform(code, { presets: 'es2015' }));
};

var loadTest = function(group, name) {
	return require('../' + cfg.utilitiesFolder + testFilename(group, name));
};

var executeTestMaybe = function (group, name, esVersion) {
	if (utilityHasVersion(group, name, esVersion)) {
		test(
			group + '/' + name + ' (es' + esVersion + ')',
			loadTest(group, name)(loadJS(group, name, esVersion))
		);
	}
};


// Init.

var utilities = R.unnest(
	fs.readdirSync(cfg.utilitiesFolder)
	.filter(isDirectory(cfg.utilitiesFolder))
	.map( function (dir) {
		return fs.readdirSync(cfg.utilitiesFolder + dir)
			.filter(isDirectory(cfg.utilitiesFolder + dir + '/'))
			.map(R.pair(dir));
	})
);

// console.log(utilities);

utilities.forEach(R.apply(function (group, name) {
	executeTestMaybe(group, name, 6);
	executeTestMaybe(group, name, 5);
}));

