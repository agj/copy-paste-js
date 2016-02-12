'use strict';

module.exports = function (selAll) {
	return function (assert) {
		assert.plan(4);
		var selected = selAll('#container span');
		assert.equals(selected.length, 2);
		assert.equals(selected[0].tagName, 'SPAN');
		assert.equals(selected[0].textContent, 'some text');
		assert.equals(selected[1].textContent, 'other text');
	};
};
