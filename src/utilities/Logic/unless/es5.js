var unless = function (pred) { return function (f) { return function (a) { return pred(a) ? a : f(a) } } };