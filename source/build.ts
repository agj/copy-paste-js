import glob from "glob-promise";
import fs from "fs/promises";
import babel from "@babel/core";
import prettier from "prettier";
import { groupBy, prop, map } from "ramda";

// Transpilation configuration

const babelConfigModern = {
  filename: "index.ts",
  presets: ["@babel/preset-typescript", "modern-browsers"],
} as any;

const babelConfigCompatible = {
  filename: "index.ts",
  presets: ["@babel/preset-typescript", "@babel/preset-env"],
  assumptions: {
    ignoreFunctionLength: true,
    ignoreToPrimitiveHint: true,
    iterableIsArray: true,
    mutableTemplateObject: true,
    noDocumentAll: true,
    noNewArrows: true,
    objectRestNoSymbols: true,
    pureGetters: true,
    setComputedProperties: true,
    setSpreadProperties: true,
    skipForOfIteratorClosing: true,
  },
} as any;

// Types

type Utility = {
  name: string;
  group: string;
  tsCode: string;
  jsCodeModern: string;
  jsCodeCompatible: string;
  readme: string | null;
};

type UtilitySingleTarget = {
  name: string;
  group: string;
  code: string;
  readme: string | null;
};

type CodeFormat = "js" | "ts";

type TemplateName = "compatible-js" | "modern-js" | "typescript";

// Utils

const pathRegex = /utilities\/([^/]+)\/([^/]+)\//;
const getGroup = (path: string) => path.match(pathRegex)?.[1] ?? "";
const getName = (path: string) => path.match(pathRegex)?.[2] ?? "";
const getUtilityPath = (name: string, group: string) =>
  `./utilities/${group}/${name}/`;
const fence = "```";

// Data retrieval utils

const getUtilityFile = async (
  fileName: string,
  name: string,
  group: string
): Promise<string | null> => {
  try {
    const result = await fs.readFile(
      getUtilityPath(name, group) + fileName,
      "utf-8"
    );
    return result;
  } catch (e) {
    return null;
  }
};

const getTypescript = (name: string, group: string) =>
  getUtilityFile("index.ts", name, group);

const getCompatible = (name: string, group: string) =>
  getUtilityFile("compatible.js", name, group);

const getReadme = (name: string, group: string) =>
  getUtilityFile("readme.md", name, group);

const getTemplate = (name: TemplateName | "license") =>
  fs.readFile(`./templates/${name}.md`, "utf-8");

// Data postprocessing utils

const postprocessTs = (name: string, code: string) =>
  prettier.format(code.replace("export default ", `const ${name} = `), {
    parser: "babel-ts",
  });

const postprocessJs = (code: string) =>
  prettier.format(
    code
      .replace(/"use strict";(\n)+/, "")
      .replace(/\n\n/g, "\n")
      .replace(/var (\w+) = function (\w+)\(/, "var $1 = function (")
      .replace(/module\.exports = function (\w+)\(/g, "var $1 = function ("),
    { parser: "babel" }
  );

const postprocessMd = (md: string) =>
  prettier.format(md, { parser: "markdown" });

// Retrieving the utilities

const utilityPaths = await glob(`./utilities/*/*/`);

const allUtilities: Array<Utility> = await Promise.all(
  utilityPaths.map(async (path) => {
    const name = getName(path);
    const group = getGroup(path);

    const tsCode = postprocessTs(name, await getTypescript(name, group));
    const jsCodeModern = postprocessJs(
      babel.transformSync(tsCode, babelConfigModern).code
    );
    const jsCodeCompatible = postprocessJs(
      (await getCompatible(name, group)) ??
        babel.transformSync(tsCode, babelConfigCompatible).code
    );
    const readme = await getReadme(name, group);

    return {
      name,
      group,
      tsCode,
      jsCodeModern,
      jsCodeCompatible,
      readme,
    };
  })
);

// Markdown generation

const license = await getTemplate("license");

const utilityToMd =
  (codeFormat: string) =>
  ({ name, code, readme }: UtilitySingleTarget) =>
    `
### \`${name}\`

${readme ?? ""}

${fence}${codeFormat}
${code}
${fence}`;

const utilitiesToMd = async (
  codeFormat: CodeFormat,
  templateName: TemplateName,
  utilities: Array<UtilitySingleTarget>
) => {
  const template = await getTemplate(templateName);

  const grouped = groupBy(prop("group"), utilities);

  const utilitiesMd = Object.keys(grouped)
    .map(
      (group) =>
        `## ${group}\n\n` +
        grouped[group].map(utilityToMd(codeFormat)).join("\n\n")
    )
    .join("\n\n");

  return template + "\n\n" + utilitiesMd + "\n\n" + license;
};

// Splitting into targets

const { compatible, modern, typescript } = allUtilities.reduce(
  (
    { compatible, modern, typescript },
    { group, name, tsCode, jsCodeModern, jsCodeCompatible, readme }
  ) => ({
    compatible: [
      ...compatible,
      { group, name, code: jsCodeCompatible, readme: readme },
    ],
    modern: [...modern, { group, name, code: jsCodeModern, readme }],
    typescript: [...typescript, { group, name, code: tsCode, readme }],
  }),
  { compatible: [], modern: [], typescript: [] }
);

// Building files

const builds: Array<[CodeFormat, TemplateName, Array<UtilitySingleTarget>]> = [
  ["js", "compatible-js", compatible],
  ["js", "modern-js", modern],
  ["ts", "typescript", typescript],
];

builds.forEach(async ([codeFormat, templateName, utilities]) => {
  const md = postprocessMd(
    await utilitiesToMd(codeFormat, templateName, utilities)
  );
  fs.writeFile(`../${templateName}.md`, md, "utf-8");
});
