import * as esbuild from "esbuild";
import dotenv from "dotenv";

dotenv.config();

const define = {};
for (const k in process.env) {
  define[`import.meta.env.${k}`] = JSON.stringify(process.env[k]);
}

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  outfile: "./dist/index.js",
  format: "esm",
  tsconfig: "./tsconfig.json",
  define,
});
