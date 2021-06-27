import partial from "./";
import partialEs5 from "./compatible";

const testWith = (partial) => async () => {
  expect.assertions(4);

  const f = (a, b) => a - b;

  expect(f(1, 2)).toBe(-1);
  expect(partial(f, [])(1, 2)).toBe(-1);
  expect(partial(f, [1])(2)).toBe(-1);
  expect(partial(f, [1, 2])()).toBe(-1);
};

describe("partial", () => {
  test("typescript", testWith(partial));
  test("compatible", testWith(partialEs5));
});
