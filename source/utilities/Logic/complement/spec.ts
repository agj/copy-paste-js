import complement from "./";

describe("complement", () => {
  test("test", async () => {
    expect.assertions(8);

    var id = function (a) {
      return a;
    };

    expect(complement(id)(true)).toBe(false);
    expect(complement(id)(1)).toBe(false);
    expect(complement(id)("truthy")).toBe(false);
    expect(complement(id)(0)).toBe(true);
    expect(complement(id)("")).toBe(true);
    expect(complement(id)(false)).toBe(true);
    expect(complement(id)(undefined)).toBe(true);
    expect(complement(id)(null)).toBe(true);
  });
});
