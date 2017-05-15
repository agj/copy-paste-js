'use strict';

const R = require('ramda');
const fs = require('mz/fs');
const glob = require('glob-promise');
const babel = require('babel-core');

const filterObjIndexed = R.curry((p, obj) =>
	Object.keys(obj)
	.filter(key => p(obj[key], key, obj))
	.reduce((r, key) => { r[key] = obj[key]; return r }, {}));

const _ = {
	dir: {
		utilities: 'src/utilities/',
		template: 'src/template/',
	},

	isDirectory: parent => (dir) => fs.statSync(parent + dir).isDirectory(),
	onLoad: (document, cb) => /interactive|complete/.test(document.readyState) ? setTimeout(cb, 0) : document.addEventListener('DOMContentLoaded', cb),
	log: R.tap(msg => console.log(msg)),
	utf8: { encoding: 'utf8' },
	readFile: filename => fs.readFile(filename, _.utf8),
	writeFile: R.curry((filename, data) => fs.writeFile(filename, data, 'utf8')),
	whenAll: Promise.all.bind(Promise),
	whenAllObj: obj =>
		Object.keys(obj)
		.into(R.reduce((acc, prop) => _.whenAll([acc, obj[prop]]).then(([accResult, thisResult]) => {
			accResult[prop] = thisResult;
			return accResult;
		}), Promise.resolve({}))),
	toES5: code => babel.transform(code, { plugins: [ "check-es2015-constants", "transform-es2015-arrow-functions", "transform-es2015-block-scoped-functions", "transform-es2015-block-scoping", "transform-es2015-classes", "transform-es2015-computed-properties", "transform-es2015-destructuring", "transform-es2015-for-of", "transform-es2015-function-name", "transform-es2015-literals", "transform-es2015-object-super", "transform-es2015-parameters", "transform-es2015-shorthand-properties", "transform-es2015-spread", "transform-es2015-sticky-regex", "transform-es2015-template-literals", "transform-es2015-typeof-symbol", "transform-es2015-unicode-regex", "transform-regenerator" ] }).code,
	br: n => '\n'.repeat(n),

	getGroupName: R.replace(/.+\/([^\/]+)\/?$/, '$1'),
	utilitiesInGroup: groupName =>
		glob(_.dir.utilities + groupName + '/*/')
		.then(R.map(_.getGroupName)),
	getFileForUtil: (filename, groupName, utilName) =>
		`${ _.dir.utilities }${ groupName }/${ utilName }/${ filename }`
		.into(R.unless(fs.existsSync, R.always(null))),
	resolveGroups: R.curry((resolver, groups) =>
		groups
		.into(R.map(groupName => [groupName, _.utilitiesInGroup(groupName)]))
		.into(R.fromPairs)
		.into(_.whenAllObj)
		.then(R.mapObjIndexed(_.resolveUtilities(resolver)))
		.then(_.whenAllObj)),
	resolveUtilities: R.curry((resolver, utilities, groupName) =>
		utilities
		.into(R.map(utilityName => [
			utilityName,
			resolver(groupName, utilityName)
		]))
		.into(R.fromPairs)
		.into(R.reject(R.isNil))
		.into(_.whenAllObj)),
	mapUtils: R.curry((fn, groups) =>
		R.mapObjIndexed(
			(utils, groupName) => R.mapObjIndexed(
				(contents, utilName) => fn(contents, utilName, groupName),
				utils
			),
			groups
		)),
	filterUtils: R.curry((fn, groups) =>
		R.mapObjIndexed(
			(utils, groupName) => filterObjIndexed(
				(contents, utilName) => fn(contents, utilName, groupName),
				utils
			),
			groups
		)),
	utilityFilename: (group, name, esVersion) => group + '/' + name + '/es' + esVersion + '.js',
};

module.exports = _;
