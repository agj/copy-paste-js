import glob from "glob-promise";
import fs from "fs/promises";
import babel from "@babel/core";
import { groupBy, prop } from "ramda";
import prettier from "prettier";

const pathRegex = /utilities\/([^/]+)\/([^/]+)\//;
const getGroup = (path: string) => path.match(pathRegex)?.[1] ?? "";
const getName = (path: string) => path.match(pathRegex)?.[2] ?? "";
const postprocessTs = (name: string, code: string) =>
  prettier.format(code.replace("export default ", `const ${name} = `), {
    parser: "babel-ts",
  });
const postprocessJs = (code: string) =>
  prettier.format(code.replace(/"use strict";(\n)+/, ""), { parser: "babel" });
const postprocessMd = (md: string) =>
  prettier.format(md, { parser: "markdown" });
const fence = "```";

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

type UtilitySingleTarget = {
  group: string;
  name: string;
  code: string;
};

type SplitUtilities = {
  compatible: Array<UtilitySingleTarget>;
  modern: Array<UtilitySingleTarget>;
  typescript: Array<UtilitySingleTarget>;
};

type CodeFormat = "js" | "ts";

type TemplateName = "compatible-js" | "modern-js" | "typescript";

const utilityPaths = await glob(`./utilities/*/*/index.ts`);

const getUtilities = (): Promise<Array<Utility>> =>
  Promise.all(
    utilityPaths.map(async (path) => {
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

const getTemplate = (name: TemplateName | "license") =>
  fs.readFile(`./templates/${name}.md`, "utf-8");

const utilityToMd =
  (codeFormat: string) =>
  ({ name, code }: UtilitySingleTarget) =>
    `
### ${name}

${fence}${codeFormat}
${code}
${fence}`;

const utilitiesToMd = async (
  codeFormat: CodeFormat,
  templateName: TemplateName,
  utilities: Array<UtilitySingleTarget>
) => {
  const template = await getTemplate(templateName);
  const license = await getTemplate("license");

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

const splitUtilitiesByTarget = (utilities: Array<Utility>): SplitUtilities =>
  utilities.reduce(
    (
      { compatible, modern, typescript },
      { group, name, tsCode, jsCodeModern, jsCodeLegacy }
    ) => ({
      compatible: [...compatible, { group, name, code: jsCodeLegacy }],
      modern: [...modern, { group, name, code: jsCodeModern }],
      typescript: [...typescript, { group, name, code: tsCode }],
    }),
    { compatible: [], modern: [], typescript: [] }
  );

getUtilities()
  .then(splitUtilitiesByTarget)
  .then(({ compatible, modern, typescript }) => {
    const builds: Array<
      [CodeFormat, TemplateName, Array<UtilitySingleTarget>]
    > = [
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
  });
