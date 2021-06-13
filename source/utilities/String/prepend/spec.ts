import prepend from "./";

describe("prepend", () => {
  test("test", async () => {
    expect.assertions(1);

    expect(prepend("before")("after")).toBe("beforeafter");
  });
});
