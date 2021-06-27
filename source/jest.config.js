export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./setup-tests.ts"],
  // transform: {},
};
