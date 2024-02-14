const { build } = require('esbuild');
const replace = require('replace-in-file');
const babel = require("@babel/core");
const fs = require("fs")

const contracts = ['/contract.js'];

// Build and bundle the contract code
build({
    entryPoints: ["./src/contract.js"],
    outdir: './dist',
    minify: false,
    bundle: true,
    target: "es6",
    format: 'iife',
})
    .catch(() => process.exit(1))

    .finally(() => {
        // Remove the "iife" part from the bundled file
        const files = contracts.map((source) => {
            return `./dist${source}`.replace('.ts', '.js');
        });
        replace.sync({
            files: files,
            from: [/\(\(\) => {/g, /}\)\(\);/g],
            to: '',
            countMatches: true,
        });
        babel.transform(fs.readFileSync("./dist/contract.js", "utf8"), { targets: ["ie 11"] }, function (err, result) {
            fs.writeFileSync("./dist/contract.js", result.code)
        });
        console.log("Built successfully!")
    });
