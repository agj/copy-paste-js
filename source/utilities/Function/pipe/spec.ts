import pipe from "./";

describe("pipe", () => {
  test("test", async () => {
    assert.plan(1);
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
    assert.equal(f("a", "b"), "abcde");
  });
});
