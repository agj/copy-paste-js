import not from "./";

describe("not", () => {
  test("test", async () => {
    assert.plan(8);

    assert.false(not(true));
    assert.false(not(1));
    assert.false(not("truthy"));
    assert.true(not(0));
    assert.true(not(""));
    assert.true(not(false));
    assert.true(not(undefined));
    assert.true(not(null));
  });
});
