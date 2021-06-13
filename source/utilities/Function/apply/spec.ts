import apply from "./";

describe("apply", () => {
  test("test", async () => {
    expect.assertions(1);
    var f = function (a, b, c) {
      return a + b + c;
    };
    expect(apply(f)(["a", "b", "c"])).toBe("abc");
  });
});
