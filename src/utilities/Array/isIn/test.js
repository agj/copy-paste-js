'use strict';

module.exports = function (isIn) {
	return function (assert) {
		assert.plan(2);

		assert.true( isIn(['a', 'b', 'c'])('b'));
		assert.false(isIn(['a', 'b', 'c'])('d'));
	};
};
