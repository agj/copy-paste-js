import debounce from "./";

describe("debounce", () => {
  test("test", async () => {
    const spy = jest.fn();

    const f = debounce(0.01, spy);

    f("first");
    f("second");
    f("third");

    expect(spy).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith("third");
  });
});
