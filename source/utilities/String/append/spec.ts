import append from "./";

import { testProp, fc } from "jest-fast-check";

describe("append", () => {
  testProp(
    "given two strings returns them concatenated in the right order",
    [fc.string(), fc.string()],
    async (left, right) => {
      expect(append(right)(left)).toBe(left + right);
    }
  );
});
