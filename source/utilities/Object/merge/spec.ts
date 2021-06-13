import merge from "./";

describe("merge", () => {
  test("test", async () => {
    assert.plan(2);

    assert.deepEqual(merge({ a: 1 })({ b: 2 }), { a: 1, b: 2 });
    assert.deepEqual(merge({ c: 1 })({ c: 2 }), { c: 2 });
  });
});
