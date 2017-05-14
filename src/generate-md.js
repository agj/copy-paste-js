'use strict';

const groups = [ 'Object', 'Array', 'String', 'Function', 'Logic', 'Browser' ];

const R = require('ramda');
const chalk = require('chalk');
const fs = require('mz/fs');
const glob = require('glob-promise');
const path = require('path');
const promisify = require('function-promisifier');
require('dot-into').install();

const _ = require('./general');
const br = _.br;

process.on(
    "unhandledRejection",
    function handleWarning( reason, promise ) {
        console.log(chalk.red("UNHANDLED PROMISE REJECTION:"));
        console.log(chalk.dim(reason));
    }
);


// Steps

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
const objToSorted = R.curry((orderedKeys, obj) =>
	R.toPairs(obj)
	.into(R.sortBy(([key, value]) => orderedKeys.indexOf(key)))
	.into(R.map(R.prop(1))));
const preprocessTemplate = R.curry((esVersion, template) =>
	template.replace(/<!-- CONDITION: (.+) -->\s*\n?([\s\S]*?)\n?\s*<!-- END CONDITION -->/g,
		(_, condition, contents) => eval(condition) ? contents : ''));
const insertUtilities = R.curry(promisify((context, insertion) => context.replace('<!-- UTILITIES HERE -->', insertion)));

const makeFile = (filename, esVersion) =>
	_.resolveGroups(esVersion, groups)
	.then(R.mapObjIndexed(groupToMarkdown))
	.then(objToSorted(groups))
	.then(R.join(br(2)))
	.then(insertUtilities(
		_.readFile(_.dir.template + 'README.md')
		.then(preprocessTemplate(esVersion))
	))
	.then(_.writeFile(filename));


// Finally, process.

[
	['README.md', 6],
	['es5.md', 5],
]
.forEach(R.apply(makeFile));

