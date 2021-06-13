import eq from "./";

describe("eq", () => {
  test("test", async () => {
    assert.plan(2);

    assert.equal(eq(0)(0), true);
    assert.equal(eq(0)(1), false);
  });
});
