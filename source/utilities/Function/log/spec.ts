import log from "./";
import logEs5 from "./compatible";

const testWith = (log) => async () => {
  var originalLog = console.log;
  const consoleLogSpy = jest.fn();
  console.log = consoleLogSpy;

  expect(log("a", "message")()).toBeUndefined();
  expect(consoleLogSpy).toHaveBeenLastCalledWith("a", "message");

  expect(log("message2")("something")).toBe("something");
  expect(consoleLogSpy).toHaveBeenLastCalledWith("message2", "something");

  expect(consoleLogSpy).toHaveBeenCalledTimes(2);

  console.log = originalLog;
};

describe("log", () => {
  test("typescript", testWith(log));
  test("compatible", testWith(logEs5));
});
