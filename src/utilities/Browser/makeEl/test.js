'use strict';

module.exports = function (makeEl) {
	return function (assert) {
		assert.plan(2);
		var el =
			makeEl('div', { id: 'some-id', 'class': 'a-class' },
				makeEl('span', null, "Text content")
			);
		assert.equal(el.tagName, 'DIV');
		assert.equal(el.childElements[0].tagName, 'SPAN');
	};
};
