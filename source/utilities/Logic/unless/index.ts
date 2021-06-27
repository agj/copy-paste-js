export default (pred) => (f) => (a) => pred(a) ? a : f(a);
