'use strict';

module.exports = function (not) {
	return function (assert) {
		assert.plan(1);

		var id = function (a) { return a };
		assert.false(not(id)(true));
	};
};
