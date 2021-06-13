'use strict';

module.exports = (onLoad, window) => assert => {
	assert.plan(3);

	let first = true;
	onLoad(() => {
		assert.false(first);
		assert.equal(window.document.readyState, 'complete');
	});
	assert.true(first);
	first = false;
}
