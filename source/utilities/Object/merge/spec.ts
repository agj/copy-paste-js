import merge from "./";

describe("merge", () => {
  test("test", async () => {
    expect.assertions(2);

    expect(merge({ a: 1 })({ b: 2 })).toEqual({ a: 1, b: 2 });
    expect(merge({ c: 1 })({ c: 2 })).toEqual({ c: 2 });
  });
});
