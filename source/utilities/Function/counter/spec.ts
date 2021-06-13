import counter from "./";

describe("counter", () => {
  test("test", async () => {
    expect.assertions(4);
    var c = counter();
    expect(c()).toBe(0);
    expect(c()).toBe(1);
    expect(c()).toBe(2);
    expect(c()).toBe(3);
  });
});
