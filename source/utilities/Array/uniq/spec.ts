import uniq from "./";

describe("uniq", () => {
  test("test", async () => {
    expect.assertions(2);
    expect(uniq(["a", "b", "c"])).toEqual(["a", "b", "c"]);
    expect(uniq(["a", "b", "a"])).toEqual(["a", "b"]);
  });
});
