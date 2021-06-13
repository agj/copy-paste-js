import onLoad from "./";

describe("onLoad", () => {
  test("test", async () => {
    expect.assertions(3);

    const spy = jest.fn(() => {
      expect(document.readyState).toBe("complete");
    });

    onLoad(spy);

    expect(spy).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
