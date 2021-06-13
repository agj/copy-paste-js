import prepend from "./";

describe("prepend", () => {
  test("test", async () => {
    assert.plan(1);

    assert.equal(prepend("before")("after"), "beforeafter");
  });
});
