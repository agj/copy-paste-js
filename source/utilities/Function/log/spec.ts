import log from "./";

describe("log", () => {
  test("test", async () => {
    var originalLog = console.log;
    const spy = jest.fn();
    console.log = spy;

    expect(log("a", "message")()).toBeUndefined();
    expect(spy).toHaveBeenLastCalledWith("a", "message");

    expect(log("message2")("something")).toBe("something");
    expect(spy).toHaveBeenLastCalledWith("message2", "something");

    expect(spy).toHaveBeenCalledTimes(2);

    console.log = originalLog;
  });
});
