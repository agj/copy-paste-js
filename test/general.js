'use strict';

var fs = require('fs');
var R = require('ramda');
var babel = require('babel-core');
var acorn = require('acorn');
var escodegen = require('escodegen');
var test = require('tape-catch');


var cfg = {
	utilitiesFolder: 'src/utilities/',
};

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
	if (esVersion === 6) code = babel.transform(code, { presets: 'es2015' }).code;
	return eval(code);
};

var loadTest = function (group, name) {
	return require('../' + cfg.utilitiesFolder + testFilename(group, name));
};

var executeTestMaybe = function (group, name, esVersion) {
	if (utilityHasVersion(group, name, esVersion)) {
		// console.log('loading js', group, name, esVersion);
		// console.log(loadJS(group, name, esVersion));
		test(
			group + '/' + name + ' (es' + esVersion + ')',
			loadTest(group, name)(loadJS(group, name, esVersion))
		);
	}
};


module.exports = {
	cfg: cfg,
	isDirectory: isDirectory,
	utilityFilename: utilityFilename,
	testFilename: testFilename,
	utilityHasVersion: utilityHasVersion,
	loadJS: loadJS,
	loadTest: loadTest,
	executeTestMaybe: executeTestMaybe,
};
