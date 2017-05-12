'use strict';

module.exports = function (prepend) {
	return function (assert) {
		assert.plan(1);

		assert.equal(prepend('before')('after'), 'beforeafter');
	};
};
