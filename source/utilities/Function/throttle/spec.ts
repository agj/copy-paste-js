import throttle from "./";

describe("throttle", () => {
  test("test", async () => {
    const spy = jest.fn();

    const f = throttle(0.01, spy);

    f("first");
    f("second");
    f("third");

    jest.advanceTimersByTime(1000);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith("first");

    f("fourth");
    f("fifth");
    f("sixth");

    jest.advanceTimersByTime(1000);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith("fourth");
  });
});
