import globals from "globals"; // ブラウザ環境のグローバル変数をESLintで認識させるための設定
import js from "@eslint/js"; // ESLintの標準JavaScriptルールセットを提供するパッケージ
import tseslint from "typescript-eslint"; // TypeScript用のESLintルールとパーサーを提供するパッケージ
import pluginReact from "eslint-plugin-react"; // React用のESLintルールセットを提供するパッケージ
import eslintConfigPrettier from "eslint-config-prettier"; // PrettierとESLintの競合を防ぐための設定
import pluginPrettier from "eslint-plugin-prettier"; // PrettierのルールをESLintに統合し、ESLintがPrettierのルールをチェックできるようにするプラグイン

export default [
  { 
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // 対象とするファイルのパターンを指定。JavaScript、TypeScript、JSX、TSXファイルが対象
  },
  { 
    ignores: ["dist"], // ESLintが無視するディレクトリを指定。ここではdistディレクトリが対象
  },
  {
    languageOptions: {
      parser: '@typescript-eslint/parser', // TypeScriptコードを解析するためのパーサーを指定
      globals: globals.browser, // ブラウザのグローバル変数（例：window, document）をESLintに認識させる
    },
  },
  js.configs.recommended, // JavaScriptのベストプラクティスに従った推奨ルールセットを適用
  ...tseslint.configs.recommended, // TypeScriptに特化した推奨ルールセットを適用
  pluginReact.configs.flat.recommended, // Reactのベストプラクティスに従った推奨ルールセットを適用
  eslintConfigPrettier, // ESLintとPrettierの競合を防ぐ設定。Prettierのルールを最優先にするための設定
  {
    plugins: [pluginPrettier], // PrettierプラグインをESLintに追加
    rules: {
      "prettier/prettier": "error", // Prettierのフォーマットルール違反をESLintでエラーとして扱う
    },
  },
];
