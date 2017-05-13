'use strict';

const fs = require('fs');
const R = require('ramda');
const test = require('tape-catch');
const JSDOM = require('jsdom').JSDOM;
const babel = require('babel-core');
const acorn = require('acorn');
const escodegen = require('escodegen');
// require('dot-into').install(); // Only when debugging tests!

const gen = require('./general');
const cfg = gen.cfg;


const isDirectory = (parent) => (dir) => fs.statSync(parent + dir).isDirectory();
const utilityFilename = (group, name, esVersion) => group + '/' + name + '/es' + esVersion + '.js';
const testFilename = (group, name) => group + '/' + name + '/test.js';
const utilityHasVersion = (group, name, esVersion) => fs.existsSync(cfg.utilitiesFolder + utilityFilename(group, name, esVersion));
const loadJSFile = (group, name, esVersion) => {
	const dirfile = cfg.utilitiesFolder + utilityFilename(group, name, esVersion);
	return fs.readFileSync(dirfile, 'utf8');
};
const loadTest = (group, name) => require('../' + cfg.utilitiesFolder + testFilename(group, name));
const toES5 = code =>
	babel.transform(code, { plugins: [ "check-es2015-constants", "transform-es2015-arrow-functions", "transform-es2015-block-scoped-functions", "transform-es2015-block-scoping", "transform-es2015-classes", "transform-es2015-computed-properties", "transform-es2015-destructuring", "transform-es2015-for-of", "transform-es2015-function-name", "transform-es2015-literals", "transform-es2015-object-super", "transform-es2015-parameters", "transform-es2015-shorthand-properties", "transform-es2015-spread", "transform-es2015-sticky-regex", "transform-es2015-template-literals", "transform-es2015-typeof-symbol", "transform-es2015-unicode-regex", "transform-regenerator" ] }).code;
const parseCode = (code, esVersion) => {
	const ast =
		acorn.parse(code, { ecmaVersion: esVersion })
		.body
		.filter(R.propEq('type', 'VariableDeclaration'))
		[0]
		.declarations
		[0]
		.init;
	return escodegen.generate(ast);
};
const evalCodeNode = (code) => eval('(' + code + ')');
const evalCodeBrowser = (code) => new Function(['window', 'document'], 'return ' + code);
const executeTestNodeMaybe = (group, name, esVersion) => {
	if (utilityHasVersion(group, name, esVersion)) {
		const utility = evalCodeNode(parseCode(loadJSFile(group, name, esVersion), esVersion));
		test(
			group + '/' + name + ' (ES' + esVersion + ')',
			loadTest(group, name)(utility)
		);
	}
};
const executeTestBrowserMaybe = (group, name, esVersion) => {
	if (utilityHasVersion(group, name, esVersion)) {
		const dom = new JSDOM(
			'<html><head></head><body>' +
				'<div id="container">' +
					'<span class="contained">some text</span>' +
					'<span>other text</span>' +
				'</div>' +
			'</body></html>'
		);
		const window = dom.window;
		const document = window.document;
		const utility = evalCodeBrowser(parseCode(loadJSFile(group, name, esVersion), esVersion))(window, document);
		test(
			group + '/' + name + ' (ES' + esVersion + ')',
			loadTest(group, name)(utility, window)
		);
	}
};


const utilities = R.unnest(
	fs.readdirSync(cfg.utilitiesFolder)
	.filter(isDirectory(cfg.utilitiesFolder))
	.map( (dir) => {
		return fs.readdirSync(cfg.utilitiesFolder + dir)
			.filter(isDirectory(cfg.utilitiesFolder + dir + '/'))
			.map(R.pair(dir));
	})
);

utilities.forEach(R.apply((group, name) => {
	if (group !== 'Browser') {
		executeTestNodeMaybe(group, name, 6);
		executeTestNodeMaybe(group, name, 5);
	} else {
		executeTestBrowserMaybe(group, name, 6);
		executeTestBrowserMaybe(group, name, 5);
	}
}));

