import isIn from "./";

describe("isIn", () => {
  test("test", async () => {
    expect.assertions(2);

    expect(isIn(["a", "b", "c"])("b")).toBe(true);
    expect(isIn(["a", "b", "c"])("d")).toBe(false);
  });
});
