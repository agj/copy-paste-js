import pipe from "./";

describe("pipe", () => {
  test("test", async () => {
    expect.assertions(1);
    var f = pipe(
      function (a, b) {
        return a + b + "c";
      },
      function (abc) {
        return abc + "d";
      },
      function (abcd) {
        return abcd + "e";
      }
    );
    expect(f("a", "b")).toBe("abcde");
  });
});
