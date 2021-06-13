'use strict';

module.exports = function (delay) {
	return function (assert) {
		assert.plan(1);
		var start = Date.now();
		delay(0.1)(function () {
			assert.true(Date.now() - start >= 0.1 * 1000);
		});
	};
};
