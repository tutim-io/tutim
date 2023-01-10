import fs from "fs/promises";


const pkgPath = "package.json";

fs.readFile(pkgPath, 'utf-8').then(f => {
  const pkgJson = JSON.parse(f);
  pkgJson.exports = {
    ".": {
      "import": "./types.es.js",
      "require": "./types.umd.js"
    }
  }
  pkgJson.types = "./dist/index.d.ts"

  fs.writeFile(pkgPath, JSON.stringify(pkgJson, null, 2))
});
