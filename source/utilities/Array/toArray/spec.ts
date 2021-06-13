import toArray from "./";

describe("toArray", () => {
  test("test", async () => {
    expect.assertions(1);

    var args = function () {
      return arguments;
    };

    assert.deepEqual(toArray(args("a", "b", "c")), ["a", "b", "c"]);
  });
});
