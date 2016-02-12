'use strict';

module.exports = function (call) {
	return function (assert) {
		assert.plan(1);
		var f = function (a, b, c) { return a + b + c };
		assert.equal(call(f)('a', 'b', 'c'), 'abc');
	};
};
