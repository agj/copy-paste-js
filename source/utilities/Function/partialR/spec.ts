import partialR from "./";
import partialREs5 from "./compatible";

const testWith = (partialR) => async () => {
  expect.assertions(4);

  const f = (a, b) => a - b;

  expect(f(1, 2)).toBe(-1);
  expect(partialR(f, [])(1, 2)).toBe(-1);
  expect(partialR(f, [1])(2)).toBe(1);
  expect(partialR(f, [1, 2])()).toBe(-1);
};

describe("partialR", () => {
  test("typescript", testWith(partialR));
  test("compatible", testWith(partialREs5));
});
