'use strict';

module.exports = function (toArray) {
	return function (assert) {
		assert.plan(1);

		var args = function () { return arguments };

		assert.deepEqual(toArray(args('a', 'b', 'c')), ['a', 'b', 'c']);
	};
};
