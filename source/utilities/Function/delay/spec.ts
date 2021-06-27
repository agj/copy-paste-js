import delay from "./";

describe("delay", () => {
  test("test", async () => {
    const spy = jest.fn();

    delay(1)(spy);

    expect(spy).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1001);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
