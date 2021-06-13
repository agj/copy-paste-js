import gt from "./";

describe("gt", () => {
  test("test", async () => {
    expect.assertions(3);

    expect(gt(0)(1)).toBe(true);
    expect(gt(0)(0)).toBe(false);
    expect(gt(1)(0)).toBe(false);
  });
});
