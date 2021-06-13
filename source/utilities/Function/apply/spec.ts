import apply from "./";

describe("apply", () => {
  test("test", async () => {
    assert.plan(1);
    var f = function (a, b, c) {
      return a + b + c;
    };
    assert.equal(apply(f)(["a", "b", "c"]), "abc");
  });
});
