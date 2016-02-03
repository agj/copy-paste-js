'use strict';

module.exports = function (isIn) {
	return function (assert) {
		assert.plan(2);

		assert.ok(   isIn(['a', 'b', 'c'])('b'));
		assert.notOk(isIn(['a', 'b', 'c'])('d'));
	};
};
