'use strict';

module.exports = function (get) {
	return function (assert) {
		assert.plan(1);

		assert.equal(get('test')({ test: 10 }), 10);
	};
};
