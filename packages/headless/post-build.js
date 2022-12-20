import fs from "fs/promises";


const pkgPath = "package.json";

fs.readFile(pkgPath, 'utf-8').then(async (f) => {
  const json = JSON.parse(f);
  const pkgJson = {
    ...json, dependencies: undefined, devDependencies: undefined,
    scripts: undefined, main: undefined, module: undefined,
    files: undefined, types: undefined,
  }
  await fs.writeFile(`dist/${pkgPath}`, JSON.stringify(pkgJson, null, 2))
  delete json.exports;
  delete json.types;
  await fs.writeFile(pkgPath, JSON.stringify(json, null, 2))
});
