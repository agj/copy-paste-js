import some from "./";

describe("some", () => {
  test("test", async () => {
    expect.assertions(2);
    var is10 = function (a) {
      return a === 10;
    };

    expect(some(is10)([0, 1, 5, 10, 6])).toBe(true);
    expect(some(is10)([0, 1, 5, 8, 6])).toBe(false);
  });
});
