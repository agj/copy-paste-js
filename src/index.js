'use strict';

const cfg = {
	groups: [ 'Object', 'Array', 'String', 'Function', 'Logic', 'Browser' ],
	utilities: 'src/utilities/',
	template: 'src/template/',
};


const R = require('ramda');
const fs = require('fs-promise');
const glob = require('glob-promise');
const path = require('path');
const promisify = require('function-promisifier');
require('dot-into').install();

process.on(
    "unhandledRejection",
    function handleWarning( reason, promise ) {
        console.log("UNHANDLED PROMISE REJECTION:");
        console.log(reason);
    }
);

// Utilities

const whenAll = Promise.all.bind(Promise);
const whenAllObj = obj =>
	Object.keys(obj)
	.into(R.reduce((acc, prop) => whenAll([acc, obj[prop]]).then(([accResult, thisResult]) => {
		accResult[prop] = thisResult;
		return accResult;
	}), Promise.resolve({})));
const whenAllDeep = obj =>
	obj.into(R.map(obj => {
		if ('then' in obj) return obj;
		return whenAllDeep(obj);
	}))
	.into(Array.isArray(obj) ? whenAll : whenAllObj);
const log = R.tap(msg => console.log(msg));
const br = n => '\n'.repeat(n);


const preprocessTemplate = R.curry((esVersion, template) =>
	template.replace(/<!-- CONDITION: (.+) -->\s*\n?([\s\S]*?)\n?\s*<!-- END CONDITION -->/g,
		(_, condition, contents) => eval(condition) ? contents : ''));
const groupToMarkdown = (utils, groupName) =>
	`### ${ groupName }` + br(2) +
	R.mapObjIndexed(utilToMarkdown, utils)
	.into(R.values)
	.join(br(2));
const utilToMarkdown = (code, utilName) =>
	`#### ${ utilName }` + br(2) +
	'```js' + br(1) +
	code + br(1) +
	'```';
const insertUtilities = R.curry(promisify((context, insertion) => context.replace('<!-- UTILITIES HERE -->', insertion)));
const utf8 = { encoding: 'utf8' };
const utilitiesInGroup = group =>
	glob(cfg.utilities + group + '/*/')
	.then(R.map(R.replace(/.+\/([^\/]+)\/?$/, '$1')));
const jsFileForUtil = (esVersion, group, util) =>
	glob(`${cfg.utilities}${group}/${util}/es${esVersion}.js`)
	.then(files => files.length > 0 ? files[0] : null);
const readFile = filename => fs.readFile(filename, utf8);
const writeFile = R.curry((filename, data) => fs.writeFile(filename, data, 'utf8'));

const makeFile = (filename, esVersion) =>
	cfg.groups
	.map(group => [group, utilitiesInGroup(group)])
	.into(R.fromPairs)
	.into(whenAllObj)
	.then(R.mapObjIndexed((utils, group) =>
		utils.map(util => [
			util,
			jsFileForUtil(esVersion, group, util)
				.then(R.unless(R.isNil, readFile))
		])
		.into(R.fromPairs)
		.into(whenAllObj)
		.then(R.reject(R.isNil))
	))
	.then(whenAllDeep)
	.then(R.mapObjIndexed(groupToMarkdown))
	.then(R.values)
	.then(R.join(br(2)))
	.then(insertUtilities(
		readFile(cfg.template + 'README.md')
		.then(preprocessTemplate(esVersion))
	))
	.then(writeFile(filename))
	.catch(err => console.log(err.stack));



makeFile('README.md', 6)
.then(R.partial(makeFile, ['es5.md', 5]));




