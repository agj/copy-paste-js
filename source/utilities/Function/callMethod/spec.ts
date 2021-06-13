import callMethod from "./";

describe("callMethod", () => {
  test("test", async () => {
    assert.plan(2);
    var f = function () {
      return this;
    };
    var o = { m: f };
    assert.equal(callMethod("m")(o), o);
    var g = function (a) {
      return a;
    };
    var p = { m: g };
    assert.equal(callMethod("m", ["a"])(p), "a");
  });
});
