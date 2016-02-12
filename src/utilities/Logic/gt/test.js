'use strict';

module.exports = function (gt) {
	return function (assert) {
		assert.plan(3);

		assert.equal(gt(0)(1), true);
		assert.equal(gt(0)(0), false);
		assert.equal(gt(1)(0), false);
	};
};
