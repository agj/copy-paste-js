import partial from "./";

describe("partial", () => {
  test("test", async () => {
    expect.assertions(4);

    const f = (a, b) => a - b;

    assert.equal(f(1, 2), -1);
    assert.equal(partial(f, [])(1, 2), -1);
    assert.equal(partial(f, [1])(2), -1);
    assert.equal(partial(f, [1, 2])(), -1);
  });
});
