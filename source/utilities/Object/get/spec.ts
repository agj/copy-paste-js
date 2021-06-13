import get from "./";

describe("get", () => {
  test("test", async () => {
    expect.assertions(1);

    assert.equal(get("test")({ test: 10 }), 10);
  });
});
