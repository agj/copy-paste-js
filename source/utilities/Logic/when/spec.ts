import when from "./";

describe("when", () => {
  test("test", async () => {
    expect.assertions(2);

    var is5 = function (a) {
      return a === 5;
    };
    var double = function (b) {
      return b * 2;
    };

    assert.equal(when(is5)(double)(5), 10);
    assert.equal(when(is5)(double)(6), 6);
  });
});
