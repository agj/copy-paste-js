import apply from "./";

describe("apply", () => {
  test("test", async () => {
    var f = function (a, b, c) {
      return a + b + c;
    };
    expect(apply(f)(["a", "b", "c"])).toBe("abc");
  });
});
