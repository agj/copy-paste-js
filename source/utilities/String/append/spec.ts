import append from "./";

describe("append", () => {
  test("test", async () => {
    expect.assertions(1);

    expect(append("after")("before")).toBe("beforeafter");
  });
});
