import unless from "./";

describe("unless", () => {
  test("test", async () => {
    expect.assertions(2);

    var is5 = function (a) {
      return a === 5;
    };
    var double = function (b) {
      return b * 2;
    };

    expect(unless(is5)(double)(5)).toBe(5);
    expect(unless(is5)(double)(6)).toBe(12);
  });
});
