import append from "./";

describe("append", () => {
  test("test", async () => {
    assert.plan(1);

    assert.equal(append("after")("before"), "beforeafter");
  });
});
