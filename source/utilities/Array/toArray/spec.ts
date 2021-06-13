import toArray from "./";

describe("toArray", () => {
  test("test", async () => {
    assert.plan(1);

    var args = function () {
      return arguments;
    };

    assert.deepEqual(toArray(args("a", "b", "c")), ["a", "b", "c"]);
  });
});
