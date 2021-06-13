import partialR from "./";

describe("partialR", () => {
  test("test", async () => {
    expect.assertions(4);

    const f = (a, b) => a - b;

    expect(f(1, 2)).toBe(-1);
    expect(partialR(f, [])(1, 2)).toBe(-1);
    expect(partialR(f, [1])(2)).toBe(1);
    expect(partialR(f, [1, 2])()).toBe(-1);
  });
});
