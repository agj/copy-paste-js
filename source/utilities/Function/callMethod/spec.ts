import callMethod from "./";
import callMethodEs5 from "./compatible.js";

describe("callMethod", () => {
  test("test", async () => {
    var f = function () {
      return this;
    };
    var o = { m: f };
    expect(callMethod("m")(o)).toEqual(o);
    expect(callMethodEs5("m")(o)).toEqual(o);
    var g = function (a) {
      return a;
    };
    var p = { m: g };
    expect(callMethod("m", ["a"])(p)).toBe("a");
    expect(callMethodEs5("m", ["a"])(p)).toBe("a");
  });
});
