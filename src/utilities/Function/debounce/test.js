'use strict';

module.exports = (debounce) => (assert) => {
	assert.plan(1);
	const start = Date.now();
	const f = debounce(0.1, n => {
		if (n === 4) assert.true(Date.now() - start > 100);
		else assert.notOk(true);
	});
	f(0);
	f(1);
	f(2);
	f(3);
	f(4);
};
