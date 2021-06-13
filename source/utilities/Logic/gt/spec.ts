import gt from "./";

describe("gt", () => {
  test("test", async () => {
    expect.assertions(3);

    assert.equal(gt(0)(1), true);
    assert.equal(gt(0)(0), false);
    assert.equal(gt(1)(0), false);
  });
});
