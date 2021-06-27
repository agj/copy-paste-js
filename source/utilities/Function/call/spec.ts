import call from "./";

describe("call", () => {
  test("test", async () => {
    expect.assertions(1);
    var f = function (a, b, c) {
      return a + b + c;
    };
    expect(call(f)("a", "b", "c")).toBe("abc");
  });
});
