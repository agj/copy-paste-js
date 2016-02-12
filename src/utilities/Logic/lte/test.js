'use strict';

module.exports = function (lte) {
	return function (assert) {
		assert.plan(3);

		assert.equal(lte(1)(0), true);
		assert.equal(lte(0)(0), true);
		assert.equal(lte(0)(1), false);
	};
};
