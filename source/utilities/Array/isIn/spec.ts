import isIn from "./";

describe("isIn", () => {
  test("test", async () => {
    assert.plan(2);

    assert.true(isIn(["a", "b", "c"])("b"));
    assert.false(isIn(["a", "b", "c"])("d"));
  });
});
