'use strict';

module.exports = function (pipe) {
	return function (assert) {
		assert.plan(1);
		var f = pipe(
			function (a, b) {
				return a + b + 'c';
			},
			function (abc) {
				return abc + 'd';
			},
			function (abcd) {
				return abcd + 'e';
			}
		);
		assert.equal(f('a', 'b'), 'abcde');
	};
};
