import callMethod from "./";

describe("callMethod", () => {
  test("test", async () => {
    expect.assertions(2);
    var f = function () {
      return this;
    };
    var o = { m: f };
    expect(callMethod("m")(o)).toEqual(o);
    var g = function (a) {
      return a;
    };
    var p = { m: g };
    expect(callMethod("m", ["a"])(p)).toBe("a");
  });
});
