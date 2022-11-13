import apply from "./";

describe("apply", () => {
  test("test", async () => {
    var f = function (a: string, b: number, c: string) {
      return a + b + c;
    };
    expect(apply(f)(["a", 3, "c"])).toBe("a3c");
  });
});
