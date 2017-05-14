'use strict';

const fs = require('fs');
const R = require('ramda');
const chalk = require('chalk');
const glob = require('glob-promise');
const test = require('tape-catch');
const JSDOM = require('jsdom').JSDOM;
const acorn = require('acorn');
const escodegen = require('escodegen');
require('dot-into').install();

const _ = require('./general');

process.on(
    "unhandledRejection",
    function handleWarning( reason, promise ) {
        console.log(chalk.red("UNHANDLED PROMISE REJECTION:"));
        console.log(chalk.dim(reason));
    }
);


const loadTest = (group, name) => require(`../${ _.dir.utilities }${ group }/${ name }/test.js`);
const evalCodeNode = (code) => eval('(' + code + ')');
const evalCodeBrowser = (code) => new Function(['window', 'document'], 'return ' + code);

const processCode = R.curry((esVersion, code) =>
	acorn.parse(code, { ecmaVersion: esVersion })
	.body
	.filter(R.propEq('type', 'VariableDeclaration'))
	[0].declarations[0].init
	.into(escodegen.generate));
const testNode = (esVersion, code, util, group) =>
	test(
		`${ group }/${ util } (ES${ esVersion })`,
		loadTest(group, util)(evalCodeNode(code))
	);
const testBrowser = (esVersion, code, util, group) => {
	const dom = new JSDOM(
		`<html><head></head><body>
			<div id="container">
				<span class="contained">some text</span>
				<span>other text</span>
			</div>
		</body></html>`
	);
	return test(
		`${ group }/${ util } (ES${ esVersion })`,
		loadTest(group, util)(evalCodeBrowser(code)(dom.window, dom.window.document), dom.window)
	);
};

const runTests = esVersion =>
	glob(_.dir.utilities + '*')
	.then(R.map(_.getGroupName))
	.then(_.resolveGroups(esVersion))
	.then(_.mapUtils(processCode(esVersion)))
	.then(_.mapUtils((code, util, group) => {
		if (group === 'Browser') testBrowser(esVersion, code, util, group);
		else testNode(esVersion, code, util, group);
	}));


[6, 5]
.forEach(runTests);

