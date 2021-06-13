import delay from "./";

describe("delay", () => {
  test("test", async () => {
    expect.assertions(1);
    var start = Date.now();
    delay(0.1)(function () {
      expect(Date.now() - start >= 0.1 * 1000).toBe(true);
    });
  });
});
