import callMethod from "./";

describe("callMethod", () => {
  test("test", async () => {
    const spyThis = jest.fn().mockReturnThis();
    const spy2 = jest.fn();
    const object = {
      methodThis: spyThis,
      method2: spy2,
    };

    const return1 = callMethod("methodThis")(object);

    expect(spyThis).toHaveBeenLastCalledWith();
    expect(return1).toBe(object);

    callMethod("method2", ["value", 2])(object);

    expect(spy2).toHaveBeenLastCalledWith("value", 2);
  });
});
