import every from "./";

describe("every", () => {
  test("test", async () => {
    expect.assertions(2);
    var is10 = function (a) {
      return a === 10;
    };

    expect(every(is10)([10, 10, 10])).toBe(true);
    expect(every(is10)([0, 1, 10, 10, 6])).toBe(false);
  });
});
