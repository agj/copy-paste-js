'use strict';

module.exports = function (after) {
	return function (assert) {
		assert.plan(1);
		var start = Date.now();
		after(0.1, function () {
			assert.true(Date.now() - start >= 0.1 * 1000);
		});
	};
};
