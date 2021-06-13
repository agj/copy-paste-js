import throttle from "./";

describe("throttle", () => {
  test("test", async () => {
    expect.assertions(2);
    var start = Date.now();
    var f = throttle(0.1, function (n) {
      if (n === 0) expect(Date.now() - start < 100).toBe(true);
      else if (n === 4) expect(Date.now() - start >= 100).toBe(true);
      else assert.notOk(true);
    });
    f(0);
    f(1);
    f(2);
    f(3);
    setTimeout(function () {
      f(4);
    }, 100);
  });
});
