import gte from "./";

describe("gte", () => {
  test("test", async () => {
    expect.assertions(3);

    assert.equal(gte(0)(1), true);
    assert.equal(gte(0)(0), true);
    assert.equal(gte(1)(0), false);
  });
});
