'use strict';

module.exports = function (makeEl) {
	return function (assert) {
		assert.plan(5);
		var el =
			makeEl('div', { id: 'some-id', 'class': 'a-class' },
				makeEl('span', null, "Text content")
			);
		assert.equal(el.tagName, 'DIV');
		assert.equal(el.id, 'some-id');
		assert.equal(el.className, 'a-class');
		assert.equal(el.children[0].tagName, 'SPAN');
		assert.equal(el.children[0].textContent, 'Text content');
	};
};
