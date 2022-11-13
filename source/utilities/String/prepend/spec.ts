import prepend from "./";

import { testProp, fc } from "@fast-check/jest";

describe("prepend", () => {
  testProp(
    "given two strings returns them concatenated in the right order",
    [fc.string(), fc.string()],
    async (left, right) => {
      expect(prepend(left)(right)).toBe(left + right);
    }
  );
});
