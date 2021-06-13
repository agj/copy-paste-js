'use strict';

module.exports = function (partial) {
	return function (assert) {
		assert.plan(4);

		const f = (a, b) => a - b;

		assert.equal(f(1, 2), -1);
		assert.equal(partial(f, [])(1, 2), -1);
		assert.equal(partial(f, [1])(2), -1);
		assert.equal(partial(f, [1, 2])(), -1);
	};
};
