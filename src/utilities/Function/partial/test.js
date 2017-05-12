'use strict';

module.exports = function (partial) {
	return function (assert) {
		assert.plan(3);

		const f = (a, b) => a + b;

		assert.equal(f(1, 2), 3);
		assert.equal(partial(f, [1])(2), 3);
		assert.equal(partial(f, [1, 2])(), 3);
	};
};
