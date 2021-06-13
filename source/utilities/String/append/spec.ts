'use strict';

module.exports = function (append) {
	return function (assert) {
		assert.plan(1);

		assert.equal(append('after')('before'), 'beforeafter');
	};
};
