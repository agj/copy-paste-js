'use strict';

var fs = require('fs');
var R = require('ramda');
var test = require('tape-catch');
var babel = require('babel-core');
var acorn = require('acorn');
var escodegen = require('escodegen');


var cfg = {
	utilitiesFolder: 'src/utilities/',
	testFolder: 'test/',
};


var testFiles = R.unnest(
	fs.readdirSync(cfg.testFolder)
	.filter( function (dir) {
		return fs.statSync(cfg.testFolder + dir).isDirectory();
	})
	.map( function (dir) {
		return fs.readdirSync(cfg.testFolder + dir)
			.filter(R.test(/\.js$/))
			.map(R.pair(dir));
	})
);

var loadTest = function(dir, file) {
	var dirfile = dir + '/' + file;
	var code = fs.readFileSync(cfg.utilitiesFolder + dirfile, 'utf8');
	// console.log(code);
	var ast =
		acorn.parse(code, { ecmaVersion: 6 })
		.body
		.filter(R.propEq('type', 'VariableDeclaration'))
		[0]
		.declarations
		[0]
		.init;
	code = escodegen.generate(ast);
	// console.log(code);
	return require('./' + dirfile)(eval(code));
};

testFiles.forEach(R.apply(function (dir, file) {
	loadTest(dir, file)
	test(dir + '/' + file, loadTest(dir, file));
}));
