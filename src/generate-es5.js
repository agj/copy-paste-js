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

glob(_.dir.utilities + '*')
.then(R.map(_.getGroupName))
.then(_.resolveGroups(6))
.then(_.mapUtils(_.toES5))
.then(_.mapUtils((code, util, group) => {
	const filename = `${ _.dir.utilities }${ group }/${ util }/es5.js`;
	if (!fs.existsSync(filename)) {
		console.log(chalk.green('CREATED ' + group + '/' + util));
		console.log(chalk.dim(code));
		fs.writeFileSync(filename, code, 'utf8');
	}
	return code;
}));

