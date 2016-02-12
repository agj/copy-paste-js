'use strict';

module.exports = function (uniq) {
	return function (assert) {
		assert.plan(2);
		assert.deepEqual(uniq(['a', 'b', 'c']), ['a', 'b', 'c']);
		assert.deepEqual(uniq(['a', 'b', 'a']), ['a', 'b']);
	};
};
