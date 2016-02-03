'use strict';

module.exports = function (every) {
	return function (assert) {
		assert.plan(2);
		var is10 = function (a) { return a === 10 };

		assert.ok( every(is10)([10, 10, 10]) );
		assert.notOk( every(is10)([0, 1, 10, 10, 6]) );
	};
};
