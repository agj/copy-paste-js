import call from "./";

describe("call", () => {
  test("test", async () => {
    expect.assertions(1);
    var f = function (a: string, b: number, c: string) {
      return a + b + c;
    };
    expect(call(f)("a", 3, "c")).toBe("a3c");
  });
});
