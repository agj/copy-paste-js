import lt from "./";

describe("lt", () => {
  test("test", async () => {
    expect.assertions(3);

    expect(lt(1)(0)).toBe(true);
    expect(lt(0)(0)).toBe(false);
    expect(lt(0)(1)).toBe(false);
  });
});
