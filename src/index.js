'use strict';

const cfg = {
	groups: [ 'Object', 'Array', 'String', 'Function', 'Logic', 'DOM' ],
	utilities: 'src/utilities/',
	template: 'src/template/',
};


require('longjohn');
const escodegen = require('escodegen');
const R = require('ramda');
const fsp = require('fs-promise');
const glob = require('glob-promise');
const path = require('path');
const promisify = require('function-promisifier');
// require('dot-into').install(); // Only for debugging tests!

const cst = require('cst');
const cstParser = new cst.Parser({ ecmaVersion: 6 });


const toMarkdown = ([filename, code]) =>
`### ${ path.basename(filename, '.js') }

\`\`\`js
${code}
\`\`\``;

const insertUtilities = R.curry(promisify((context, insertion) => context.replace('<!-- UTILITIES HERE -->', insertion)));


cfg.groups
.map(group => cfg.utilities + group + '.js')
.into(filenames =>
	filenames
	.map(name => fsp.readFile(name, { encoding: 'utf8' }))
	.into(Promise.all.bind(Promise))
	.then(R.map(R.pipe(
		file => cstParser.parse(file),
		cst => cst.body.filter(R.propEq('type', 'VariableDeclaration')),
		R.map(cst => escodegen.generate(cst, { verbatim: '_value' })),
		R.join('\n\n')
	)))
	.then(R.zip(filenames))
	.then(R.map(toMarkdown))
	.then(R.join('\n\n\n'))
)
.then(insertUtilities(fsp.readFile(cfg.template + 'README.md', { encoding: 'utf8' })))
.then(data => fsp.writeFile('README.md', data, { encoding: 'utf8' }))
.catch(err => console.log(err.stack));



