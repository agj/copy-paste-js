import test from "./";

describe("test", () => {
  test("test", async () => {
    expect.assertions(2);

    assert.equal(test(/included/)("text includedtext"), true);
    assert.equal(test(/notincluded/)("text includedtext"), false);
  });
});
