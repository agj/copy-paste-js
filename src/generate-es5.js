'use strict';

const R = require('ramda');
const fs = require('mz/fs');
const glob = require('glob-promise');
const chalk = require('chalk');
require('dot-into').install();

const _ = require('./general');

process.on(
    "unhandledRejection",
    function handleWarning( reason, promise ) {
        console.log(chalk.red("UNHANDLED PROMISE REJECTION:"));
        console.log(chalk.dim(reason));
    }
);

const resolveJS = R.curry((group, util) =>
	!_.getFileForUtil('es5.js', group, util)
		? R.unless(R.isNil, _.readFile, _.getFileForUtil('es6.js', group, util))
		: null);

glob(_.dir.utilities + '*')
.then(R.map(_.getGroupName))
.then(_.resolveGroups(resolveJS))
.then(_.mapUtils(_.toES5))
.then(_.mapUtils((code, util, group) => {
	const filename = `${ _.dir.utilities }${ group }/${ util }/es5.js`;
	console.log(chalk.green('CREATING ' + group + '/' + util));
	console.log(chalk.dim(code));
	fs.writeFileSync(filename, code, 'utf8');
	return code;
}));

