import get from "./";

describe("get", () => {
  test("test", async () => {
    expect.assertions(1);

    expect(get("test")({ test: 10 })).toBe(10);
  });
});
