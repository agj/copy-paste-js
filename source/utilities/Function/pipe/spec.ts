import pipe from "./";
import pipeEs5 from "./compatible";

const testWith = (pipe) => async () => {
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
};

describe("pipe", () => {
  test("typescript", testWith(pipe));
  test("compatible", testWith(pipeEs5));
});
