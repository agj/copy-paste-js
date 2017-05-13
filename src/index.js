'use strict';

const cfg = {
	groups: [ 'Object', 'Array', 'String', 'Function', 'Logic', 'Browser' ],
	utilities: 'src/utilities/',
	template: 'src/template/',
};


const escodegen = require('escodegen');
const acorn = require('acorn');
const R = require('ramda');
const fs = require('fs-promise');
const glob = require('glob-promise');
const path = require('path');
const promisify = require('function-promisifier');
require('dot-into').install();

process.on(
    "unhandledRejection",
    function handleWarning( reason, promise ) {
        console.log("[PROCESS] Unhandled Promise Rejection");
        console.log("- - - - - - - - - - - - - - - - - - -");
        console.log( reason );
        console.log("- - - - - - - - - - - - - - - - - - -");
    }
);

const cst = require('cst');
const cstParser = new cst.Parser({ ecmaVersion: 6 });

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
		console.log('then in obj', 'then' in obj, obj);
		if ('then' in obj) return obj;
		else return whenAllDeep(obj);
	}))
	.into(whenAllObj);
const log = R.tap(msg => console.log(msg));


const toMarkdown = ([filename, code]) =>
`### ${ path.basename(filename, '.js') }

\`\`\`js
${code}
\`\`\``;
const insertUtilities = R.curry(promisify((context, insertion) => context.replace('<!-- UTILITIES HERE -->', insertion)));
const utf8 = { encoding: 'utf8' };
const utilitiesInGroup = group =>
	glob(cfg.utilities + group + '/*/')
	.then(R.map(R.replace(/.+\/([^\/]+)\/?$/, '$1')));
const jsFilesForUtil = (group, util) => glob(`${cfg.utilities}${group}/${util}/es*.js`);
const readFile = filename => fs.readFile(filename, utf8);
const getDefinition = code =>
	acorn.parse(code, { ecmaVersion: 6 })
	.body
	.filter(R.propEq('type', 'VariableDeclaration'))
	[0];
const parseCST = escodegen.generate;
const compareInputOutput = R.curry((original, processed) => { if (original !== processed) console.error("Original and processed don\'t match!", original, processed) });


cfg.groups
.map(group => [group, utilitiesInGroup(group)])
.into(R.fromPairs)
.into(whenAllObj)
.then(R.tap(console.log))
.then(R.mapObjIndexed((utils, group) =>
	utils.map(util => [util, jsFilesForUtil(group, util)])
	.into(R.fromPairs)
	.into(whenAllObj)
	.then(R.map(R.map(
		R.pipe(readFile, promisify(getDefinition), promisify(parseCST))
	)))
))
.then(whenAllDeep)
.then(whenAllDeep)
.then(R.tap(() => console.log('done')))
.then(result => {
	console.log(result['Browser']['makeEl'][0]);
})

// .into(filenames =>
// 	filenames
// 	.map(name => fs.readFile(name, utf8))
// 	.into(whenAll)
// 	.then(R.map(file => R.pipe(
// 		file => cstParser.parse(file),
// 		cst => cst.body.filter(R.propEq('type', 'VariableDeclaration')),
// 		R.map(cst => escodegen.generate(cst, { verbatim: '_value' })),
// 		(processed) => {
// 			if (file !== processed) throw "Original and processed don\'t match!\n\n" + file + "\n\n" + processed;
// 			return processed;
// 		},
// 		R.join('\n\n')
// 	)(file)
// 	))
// 	.then(R.zip(filenames))
// 	.then(R.map(toMarkdown))
// 	.then(R.join('\n\n\n'))
// )
// .then(insertUtilities(fs.readFile(cfg.template + 'README.md', utf8)))
// .then(data => fs.writeFile('README.md', data, utf8))
.catch(err => console.log(err.stack));



