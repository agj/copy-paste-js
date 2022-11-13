import { fc } from "@fast-check/jest";

export const nextTick = async () => {
  jest.useRealTimers();
  await new Promise((resolve) => setTimeout(resolve, 0));
  jest.useFakeTimers();
};

export const fcFilledArray = fc.array(
  fc.oneof(
    fc.integer(),
    fc.float(),
    fc.string(),
    fc.boolean(),
    fc.dictionary(fc.string(), fc.float())
  )
);
