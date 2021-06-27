import debounce from "./";
import debounceEs5 from "./compatible";

const testWith = (debounce) => async () => {
  const spy = jest.fn();

  const f = debounce(0.01, spy);

  f("first");
  f("second");
  f("third");

  expect(spy).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(1000);

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenLastCalledWith("third");
};

describe("debounce", () => {
  test("typescript", testWith(debounce));
  test("compatible", testWith(debounceEs5));
});
