import partialR from "./";

describe("partialR", () => {
  test("test", async () => {
    assert.plan(4);

    const f = (a, b) => a - b;

    assert.equal(f(1, 2), -1);
    assert.equal(partialR(f, [])(1, 2), -1);
    assert.equal(partialR(f, [1])(2), 1);
    assert.equal(partialR(f, [1, 2])(), -1);
  });
});
