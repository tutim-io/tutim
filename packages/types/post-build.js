import fs from "fs/promises";


const pkgPath = "package.json";

fs.readFile(pkgPath, 'utf-8').then(async (f) => {
  const json = JSON.parse(f);
  const buildPkgJson = {
    ...json,
    module: "./index.js",
    types: "./index.d.ts",
    scripts: undefined
  }
  await fs.writeFile(`dist/${pkgPath}`, JSON.stringify(buildPkgJson, null, 2))
  await fs.writeFile(pkgPath, JSON.stringify(json, null, 2))
});
