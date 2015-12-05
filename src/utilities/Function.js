
const call = f => (...args) => f(...args);

const apply = f => (args) => f(...args);

const callMethod = (method, ...args) => obj => obj[method](...args);

const pipe = (...fs) => fs.reduce((left, right) => (...args) => right(left(...args)));

const alternate = (f, g) => {
	let state = false;
	return (...args) => {
		state = !state;
		return state ? f(...args) : g(...args);
	};
};
