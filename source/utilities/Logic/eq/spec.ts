import eq from "./";

describe("eq", () => {
  test("test", async () => {
    expect.assertions(2);

    expect(eq(0)(0)).toBe(true);
    expect(eq(0)(1)).toBe(false);
  });
});
