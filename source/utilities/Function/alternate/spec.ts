import alternate from "./";

describe("alternate", () => {
  test("test", async () => {
    expect.assertions(4);
    var f = alternate(
      function (n) {
        expect(n === 0 || n === 2).toBe(true);
      },
      function (n) {
        expect(n === 1 || n === 3).toBe(true);
      }
    );
    f(0);
    f(1);
    f(2);
    f(3);
  });
});
