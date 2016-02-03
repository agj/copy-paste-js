'use strict';

(function outer() {
	(function inner() {
		(0, eval)('var a = 10;');
		console.log('a in inner:', a);
	}());
	console.log('a in outer:', a);
})();
