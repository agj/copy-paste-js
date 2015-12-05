
const eq = a => b => b === a;

const lt = a => b => b < a;

const lte = a => b => b <= a;

const gt = a => b => b > a;

const gte = a => b => b >= a;

const not = f => (...args) => !f(...args);
