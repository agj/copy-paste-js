'use strict';

module.exports = function (unless) {
	return function (assert) {
		assert.plan(2);

		var is5 = function (a) { return a === 5 };
		var double = function (b) { return b * 2 };

		assert.equal(unless(is5)(double)(5), 5);
		assert.equal(unless(is5)(double)(6), 12);
	};
};