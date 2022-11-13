import onFullLoad from "./";

const testWith = (onFullLoad) => async () => {
  expect.assertions(3);

  const spy = jest.fn(() => {
    expect(document.readyState).toBe("complete");
  });

  onFullLoad(spy);

  expect(spy).toHaveBeenCalledTimes(0);

  jest.advanceTimersByTime(1000);

  expect(spy).toHaveBeenCalledTimes(1);
};

describe("onFullLoad", () => {
  test("typescript", testWith(onFullLoad));
});
