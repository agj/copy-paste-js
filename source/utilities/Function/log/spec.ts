import log from "./";

describe("log", () => {
  test("test", async () => {
    expect.assertions(2);
    var originalLog = console.log;
    var modLog = function () {
      console.log = originalLog;
      assert.deepEqual(Array.from(arguments), ["a", "message"]);
    };
    console.log = modLog;
    log("a", "message")();
    console.log = modLog;
    log("a", "message")("ignored");
  });
});
