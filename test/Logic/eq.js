'use strict';

module.exports = function (eq) {
	return function (assert) {
		assert.plan(2);

		assert.equal(eq(0)(0), true);
		assert.equal(eq(0)(1), false);
	};
};
