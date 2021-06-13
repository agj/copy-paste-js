import prepend from "./";

describe("prepend", () => {
  test("test", async () => {
    expect.assertions(1);

    assert.equal(prepend("before")("after"), "beforeafter");
  });
});
