import glob from "glob-promise";
import fs from "fs/promises";
import babel from "@babel/core";
import { replace } from "ramda";

const pathRegex = /utilities\/([^/]+)\/([^/]+)\//;
const getGroup = (path: string) => path.match(pathRegex)?.[1] ?? "";
const getName = (path: string) => path.match(pathRegex)?.[2] ?? "";
const postprocessTs = (name: string, code: string) =>
  code.replace("export default ", `const ${name} = `);
const postprocessJs = (code: string) => code.replace(/"use strict";(\n)+/, "");

const babelConfigModern = {
  filename: "index.ts",
  presets: ["@babel/preset-typescript", "modern-browsers"],
} as any;
const babelConfigLegacy = {
  filename: "index.ts",
  presets: ["@babel/preset-typescript", "@babel/preset-env"],
} as any;

type Utility = {
  group: string;
  name: string;
  tsCode: string;
  jsCodeModern: string;
  jsCodeLegacy: string;
};

const utilityFiles = await glob(`./utilities/*/*/index.ts`);

const getUtilities = (): Promise<Array<Utility>> =>
  Promise.all(
    utilityFiles.map(async (path) => {
      const name = getName(path);
      const tsCode = postprocessTs(name, await fs.readFile(path, "utf-8"));
      const jsCodeModern = postprocessJs(
        babel.transformSync(tsCode, babelConfigModern).code
      );
      const jsCodeLegacy = postprocessJs(
        babel.transformSync(tsCode, babelConfigLegacy).code
      );
      return {
        group: getGroup(path),
        name,
        tsCode,
        jsCodeModern,
        jsCodeLegacy,
      };
    })
  );

getUtilities().then(console.log);
