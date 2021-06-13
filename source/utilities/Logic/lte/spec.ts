import lte from "./";

describe("lte", () => {
  test("test", async () => {
    assert.plan(3);

    assert.equal(lte(1)(0), true);
    assert.equal(lte(0)(0), true);
    assert.equal(lte(0)(1), false);
  });
});
