'use strict';

const cfg = {
	utilities: 'src/utilities/',
};

const R = require('ramda');
const fs = require('mz/fs');
const glob = require('glob-promise');
const path = require('path');
const promisify = require('function-promisifier');
const babel = require('babel-core');
const chalk = require('chalk');
require('dot-into').install();

process.on(
    "unhandledRejection",
    function handleWarning( reason, promise ) {
        console.log(chalk.red("UNHANDLED PROMISE REJECTION:"));
        console.log(chalk.dim(reason));
    }
);

const utf8 = { encoding: 'utf8' };
const readFile = filename => fs.readFile(filename, utf8);
const writeFile = R.curry((filename, data) => fs.writeFile(filename, data, 'utf8'));
const whenAll = Promise.all.bind(Promise);
const whenAllObj = obj =>
	Object.keys(obj)
	.into(R.reduce((acc, prop) => whenAll([acc, obj[prop]]).then(([accResult, thisResult]) => {
		accResult[prop] = thisResult;
		return accResult;
	}), Promise.resolve({})));


const getGroupName = R.replace(/.+\/([^\/]+)\/?$/, '$1');
const utilitiesInGroup = groupName =>
	glob(cfg.utilities + groupName + '/*/')
	.then(R.map(getGroupName));
const jsFileForUtil = (esVersion, groupName, utilName) =>
	glob(`${cfg.utilities}${groupName}/${utilName}/es${esVersion}.js`)
	.then(files => files.length > 0 ? files[0] : null);
const resolveGroups = R.curry((esVersion, groups) =>
	groups
	.into(R.map(groupName => [groupName, utilitiesInGroup(groupName)]))
	.into(R.fromPairs)
	.into(whenAllObj)
	.then(R.mapObjIndexed(resolveUtilities(esVersion)))
	.then(whenAllObj));
const resolveUtilities = R.curry((esVersion, utilities, groupName) =>
	utilities
	.into(R.map(utilityName => [
		utilityName,
		jsFileForUtil(esVersion, groupName, utilityName)
			.then(R.unless(R.isNil, readFile))
	]))
	.into(R.fromPairs)
	.into(R.reject(R.isNil))
	.into(whenAllObj));
const mapUtils = R.curry((fn, groups) =>
	R.mapObjIndexed(
		(utils, groupName) => R.mapObjIndexed(
			(contents, utilName) => fn(contents, utilName, groupName),
			utils
		),
		groups
	));
const toES5 = code =>
	babel.transform(code, { plugins: [ "check-es2015-constants", "transform-es2015-arrow-functions", "transform-es2015-block-scoped-functions", "transform-es2015-block-scoping", "transform-es2015-classes", "transform-es2015-computed-properties", "transform-es2015-destructuring", "transform-es2015-for-of", "transform-es2015-function-name", "transform-es2015-literals", "transform-es2015-object-super", "transform-es2015-parameters", "transform-es2015-shorthand-properties", "transform-es2015-spread", "transform-es2015-sticky-regex", "transform-es2015-template-literals", "transform-es2015-typeof-symbol", "transform-es2015-unicode-regex", "transform-regenerator" ] }).code;


glob(cfg.utilities + '*')
.then(R.map(getGroupName))
.then(resolveGroups(6))
.then(mapUtils(toES5))
.then(mapUtils((code, util, group) => {
	const filename = `${ cfg.utilities }${ group }/${ util }/es5.js`;
	if (!fs.existsSync(filename)) {
		console.log(chalk.green('CREATED ' + group + '/' + util));
		console.log(chalk.dim(code));
		fs.writeFileSync(filename, code, 'utf8');
	}
	return code;
}));

