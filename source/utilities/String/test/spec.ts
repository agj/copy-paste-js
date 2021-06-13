'use strict';

module.exports = function (test) {
	return function (assert) {
		assert.plan(2);

		assert.equal(test(/included/)('text includedtext'), true);
		assert.equal(test(/notincluded/)('text includedtext'), false);
	};
};
