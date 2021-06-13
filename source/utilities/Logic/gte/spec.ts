import gte from "./";

describe("gte", () => {
  test("test", async () => {
    expect.assertions(3);

    expect(gte(0)(1)).toBe(true);
    expect(gte(0)(0)).toBe(true);
    expect(gte(1)(0)).toBe(false);
  });
});
