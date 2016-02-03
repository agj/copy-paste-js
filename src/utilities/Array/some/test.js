'use strict';

module.exports = function (some) {
	return function (assert) {
		assert.plan(2);
		var is10 = function (a) { return a === 10 };

		assert.ok( some(is10)([0, 1, 5, 10, 6]) );
		assert.notOk( some(is10)([0, 1, 5, 8, 6]) );
	};
};
