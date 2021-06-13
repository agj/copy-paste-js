import every from "./";

describe("every", () => {
  test("test", async () => {
    assert.plan(2);
    var is10 = function (a) {
      return a === 10;
    };

    assert.true(every(is10)([10, 10, 10]));
    assert.false(every(is10)([0, 1, 10, 10, 6]));
  });
});
