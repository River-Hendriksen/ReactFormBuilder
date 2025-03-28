import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-import-css";
import commonJs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import packageJson from "./package.json" with  { type: "json" };
import json from "@rollup/plugin-json";

export default [
  {
    input: "src/index.ts",
    external: [...Object.keys(packageJson.peerDependencies || {})],
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      json(), // Use this plugin to handle JSON files
      css(),
      typescript({ tsconfig: "./tsconfig.json" }),
      commonJs(),
      resolve(),
      terser(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
