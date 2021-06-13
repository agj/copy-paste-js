import get from "./";

describe("get", () => {
  test("test", async () => {
    assert.plan(1);

    assert.equal(get("test")({ test: 10 }), 10);
  });
});
