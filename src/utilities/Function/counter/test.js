'use strict';

module.exports = function (counter) {
	return function (assert) {
		assert.plan(4);
		var c = counter();
		assert.equal(c(), 0);
		assert.equal(c(), 1);
		assert.equal(c(), 2);
		assert.equal(c(), 3);
	};
};
