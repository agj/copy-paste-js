import zip from "./";
import { fc, testProp } from "@fast-check/jest";
import { fcFilledArray } from "../../../test-utils";

describe("zip", () => {
  test("returns an empty list when both arguments are empty lists", async () => {
    expect(zip([])([])).toEqual([]);
  });

  testProp(
    "returns an array whose length is equal to left's",
    [fcFilledArray, fcFilledArray],
    (left, right) => {
      const length = zip(right)(left).length;

      expect(length).toBe(left.length);
    }
  );

  testProp(
    "returns an array whose members are all 2-tuples",
    [fcFilledArray, fcFilledArray],
    (left, right) => {
      const lengths = zip(right)(left).map((r) => r.length);

      expect(lengths).toEqual(Array(left.length).fill(2));
    }
  );

  testProp(
    "returns an array whose first members equal left",
    [fcFilledArray, fcFilledArray],
    (left, right) => {
      const firsts = zip(right)(left).map(([l, _]) => l);

      expect(firsts).toEqual(left);
    }
  );

  testProp(
    "returns an array whose second members equal right truncated/padded to match left's length",
    [fcFilledArray, fcFilledArray],
    (left, right) => {
      const seconds = zip(right)(left).map(([_, r]) => r);

      const rightProcessed = [...right];
      rightProcessed.length = left.length;

      expect(seconds).toEqual(rightProcessed);
    }
  );
});
