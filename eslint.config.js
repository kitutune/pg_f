import globals from "globals";
// import pluginJs from "@eslint/js";
import js from "@eslint/js";
//  js.configs.recommended,
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";


export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { ignores: ["dist"] },
  {
    languageOptions: {
      // defaultで設定されている
      // ecmaVersion:"latest",
      // defaultで設定されている
      // sourceType:"module"
      parser: '@typescript-eslint/parser',
      globals: globals.browser,
    },
  },
  // pluginJs.configs.recommended,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
];
