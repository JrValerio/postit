import pkg from "@eslint/js";
import globals from "globals"; 
const { configs: eslintRecommended } = pkg;
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: [
      "node_modules/",
      "public/",
      "*.config.js",
      "public/htmx.min.js",
    ],
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        ...globals.browser,
        ...globals.node,
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintRecommended.recommended.rules, 
      "prettier/prettier": "error", 
    },
  },
];
