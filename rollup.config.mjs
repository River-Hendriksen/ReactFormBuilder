import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-import-css";
import commonJs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";
import packageJson from "./package.json" with { type: "json" };

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
      json(),
      css(),
      resolve({
        extensions: [".mjs", ".js", ".json", ".node", ".ts", ".tsx"],
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        clean: true,
        include: ["**/*.ts", "**/*.tsx"],
        tsconfigOverride: {
          include: ["src/**/*"],
          exclude: ["node_modules", "dist", "rollup.config.mjs"],
        },
      }),
      commonJs(),
      terser(),
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
