'use strict';

module.exports = function (onLoad, window) {
	return function (assert) {
		assert.plan(3);

		var first = true;
		onLoad(function () {
			assert.false(first);
			assert.equal(window.document.readyState, 'complete');
		});
		assert.true(first);
		first = false;
	};
};
