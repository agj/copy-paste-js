import apply from "./";
import applyEs5 from "./compatible.js";

describe("apply", () => {
  test("test", async () => {
    var f = function (a, b, c) {
      return a + b + c;
    };
    expect(apply(f)(["a", "b", "c"])).toBe("abc");
    expect(applyEs5(f)(["a", "b", "c"])).toBe("abc");
  });
});
