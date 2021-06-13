'use strict';

module.exports = function (alternate) {
	return function (assert) {
		assert.plan(4);
		var f = alternate(
			function (n) {
				assert.true(n === 0 || n === 2);
			},
			function (n) {
				assert.true(n === 1 || n === 3);
			}
		);
		f(0);
		f(1);
		f(2);
		f(3);
	};
};
