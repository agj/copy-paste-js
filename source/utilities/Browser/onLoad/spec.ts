"use strict";

module.exports = (onLoad, window) => (assert) => {
  expect.assertions(3);

  let first = true;
  onLoad(() => {
    expect(first).toBe(false);
    assert.equal(window.document.readyState, "complete");
  });
  expect(first).toBe(true);
  first = false;
};
