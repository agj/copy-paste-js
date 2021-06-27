import not from "./";

describe("not", () => {
  test("test", async () => {
    expect.assertions(8);

    expect(not(true)).toBe(false);
    expect(not(1)).toBe(false);
    expect(not("truthy")).toBe(false);
    expect(not(0)).toBe(true);
    expect(not("")).toBe(true);
    expect(not(false)).toBe(true);
    expect(not(undefined)).toBe(true);
    expect(not(null)).toBe(true);
  });
});
