import onLoad from "./";
import onLoadEs5 from "./compatible";

const testWith = (onLoad) => async () => {
  expect.assertions(3);

  const spy = jest.fn(() => {
    expect(document.readyState).toBe("complete");
  });

  onLoad(spy);

  expect(spy).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(1000);

  expect(spy).toHaveBeenCalledTimes(1);
};

describe("onLoad", () => {
  test("typescript", testWith(onLoad));
  test("compatible", testWith(onLoadEs5));
});
