'use strict';

module.exports = function (gte) {
	return function (assert) {
		assert.plan(3);

		assert.equal(gte(0)(1), true);
		assert.equal(gte(0)(0), true);
		assert.equal(gte(1)(0), false);
	};
};
