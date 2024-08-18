import globals from "globals"; // ブラウザ環境のグローバル変数をESLintで認識させるための設定
import pluginJs from "@eslint/js"; // ESLintの標準JavaScriptルールセットを提供するパッケージ
import tseslint from "typescript-eslint"; // TypeScript用のESLintルールとパーサーを提供するパッケージ
import pluginReact from "eslint-plugin-react"; // React用のESLintルールセットを提供するパッケージ

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] }, // 対象とするファイルのパターンを指定。JavaScript、TypeScript、JSX、TSXファイルが対象
  { languageOptions: { globals: globals.browser } }, // ブラウザのグローバル変数（例：window, document）をESLintに認識させる
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "no-console": "error", // 試し
    },
  },
];
