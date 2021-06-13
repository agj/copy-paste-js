import lt from "./";

describe("lt", () => {
  test("test", async () => {
    expect.assertions(3);

    assert.equal(lt(1)(0), true);
    assert.equal(lt(0)(0), false);
    assert.equal(lt(0)(1), false);
  });
});
