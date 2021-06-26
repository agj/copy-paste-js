import callMethod from "./";

import { testProp, fc } from "jest-fast-check";

describe("callMethod", () => {
  testProp(
    "creates a function that calls the appropriate method",
    [fc.string()],
    async (methodName) => {
      const spy = jest.fn();
      const object = {
        [methodName]: spy,
      };

      expect(spy).toHaveBeenCalledTimes(0);

      callMethod(methodName)(object);
      callMethod(methodName)(object);

      expect(spy).toHaveBeenCalledTimes(2);
    }
  );

  test("creates a function that preserves `this`", async () => {
    const spy = jest.fn().mockReturnThis();
    const object = {
      methodName: spy,
    };

    const return1 = callMethod("methodName")(object);

    expect(spy).toHaveBeenLastCalledWith();
    expect(return1).toBe(object);
  });

  testProp(
    "creates a function that passes all of its received arguments to the method",
    [
      fc.array(
        fc.oneof(
          fc.integer(),
          fc.float(),
          fc.string(),
          fc.boolean(),
          fc.dictionary(fc.string(), fc.float())
        )
      ),
    ],
    async (args) => {
      const spy = jest.fn();
      const object = {
        method: spy,
      };

      callMethod("method", args)(object);

      expect(spy).toHaveBeenLastCalledWith(...args);
    }
  );
});
