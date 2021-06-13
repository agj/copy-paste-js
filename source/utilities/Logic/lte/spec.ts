import lte from "./";

describe("lte", () => {
  test("test", async () => {
    expect.assertions(3);

    expect(lte(1)(0)).toBe(true);
    expect(lte(0)(0)).toBe(true);
    expect(lte(0)(1)).toBe(false);
  });
});
