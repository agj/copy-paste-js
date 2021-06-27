export default (pred) => (f) => (a) => pred(a) ? f(a) : a;
