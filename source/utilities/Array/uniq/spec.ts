import uniq from "./";

describe("uniq", () => {
  test("test", async () => {
    expect.assertions(2);
    assert.deepEqual(uniq(["a", "b", "c"]), ["a", "b", "c"]);
    assert.deepEqual(uniq(["a", "b", "a"]), ["a", "b"]);
  });
});
