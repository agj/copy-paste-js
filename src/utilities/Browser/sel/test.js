'use strict';

var onLoad = require('../../../../test/general').onLoad;

module.exports = function (sel, window) {
	return function (assert) {
		assert.plan(2);
		onLoad(window.document, function () {
			var selected = sel('#container .contained');
			assert.equal(selected.tagName, 'SPAN');
			assert.equal(selected.textContent, 'some text');
		});
	};
};
