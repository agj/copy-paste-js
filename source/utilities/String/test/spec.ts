import test_ from "./";

describe("test", () => {
  test("test", async () => {
    expect.assertions(2);

    expect(test_(/included/)("text includedtext")).toBe(true);
    expect(test_(/notincluded/)("text includedtext")).toBe(false);
  });
});
