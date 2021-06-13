import append from "./";

describe("append", () => {
  test("test", async () => {
    expect.assertions(1);

    assert.equal(append("after")("before"), "beforeafter");
  });
});
