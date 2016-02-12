'use strict';

var fs = require('fs');
var R = require('ramda');
var test = require('tape-catch');
var jsdom = require('jsdom').jsdom;
var babel = require('babel-core');
var acorn = require('acorn');
var escodegen = require('escodegen');

var gen = require('./general');
var cfg = gen.cfg;


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
var loadJSFile = function (group, name, esVersion) {
	var dirfile = cfg.utilitiesFolder + utilityFilename(group, name, esVersion);
	return fs.readFileSync(dirfile, 'utf8');
};
var loadTest = function (group, name) {
	return require('../' + cfg.utilitiesFolder + testFilename(group, name));
};
var parseCode = function (code, esVersion) {
	var ast =
		acorn.parse(code, { ecmaVersion: esVersion })
		.body
		.filter(R.propEq('type', 'VariableDeclaration'))
		[0]
		.declarations
		[0]
		.init;
	code = escodegen.generate(ast);
	if (esVersion === 6) code = babel.transform(code, { plugins: [ "check-es2015-constants", "transform-es2015-arrow-functions", "transform-es2015-block-scoped-functions", "transform-es2015-block-scoping", "transform-es2015-classes", "transform-es2015-computed-properties", "transform-es2015-destructuring", "transform-es2015-for-of", "transform-es2015-function-name", "transform-es2015-literals", "transform-es2015-object-super", "transform-es2015-parameters", "transform-es2015-shorthand-properties", "transform-es2015-spread", "transform-es2015-sticky-regex", "transform-es2015-template-literals", "transform-es2015-typeof-symbol", "transform-es2015-unicode-regex", "transform-regenerator" ] }).code;
	return code;
}
var evalCodeNode = function (code) {
	return eval(code);
};
var evalCodeBrowser = function (code) {
	return new Function(['window', 'document'], 'return ' + code);
};
var executeTestNodeMaybe = function (group, name, esVersion) {
	if (utilityHasVersion(group, name, esVersion)) {
		var utility = evalCodeNode(parseCode(loadJSFile(group, name, esVersion), esVersion));
		test(
			group + '/' + name + ' (ES' + esVersion + ')',
			loadTest(group, name)(utility)
		);
	}
};
var executeTestBrowserMaybe = function (group, name, esVersion) {
	if (utilityHasVersion(group, name, esVersion)) {
		var document = jsdom(
			'<html><head></head><body>' +
				'<div id="container">' +
					'<span class="contained">some text</span>' +
				'</div>' +
			'</body></html>'
		);
		var window = document.defaultView;
		var utility = evalCodeBrowser(parseCode(loadJSFile(group, name, esVersion), esVersion))(window, document);
		test(
			group + '/' + name + ' (ES' + esVersion + ')',
			loadTest(group, name)(utility, window)
		);
	}
};


var utilities = R.unnest(
	fs.readdirSync(cfg.utilitiesFolder)
	.filter(isDirectory(cfg.utilitiesFolder))
	.map( function (dir) {
		return fs.readdirSync(cfg.utilitiesFolder + dir)
			.filter(isDirectory(cfg.utilitiesFolder + dir + '/'))
			.map(R.pair(dir));
	})
);

utilities.forEach(R.apply(function (group, name) {
	if (group !== 'Browser') {
		executeTestNodeMaybe(group, name, 6);
		executeTestNodeMaybe(group, name, 5);
	} else {
		executeTestBrowserMaybe(group, name, 6);
		executeTestBrowserMaybe(group, name, 5);
	}
}));

