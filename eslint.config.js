import pluginJs from "@eslint/js"; // ESLintの標準JavaScriptルールセットを提供するパッケージ
import eslintConfigPrettier from "eslint-config-prettier"; // PrettierとESLintの競合を防ぐための設定
import pluginReact from "eslint-plugin-react"; // React用のESLintルールセットを提供するパッケージ
import globals from "globals"; // ブラウザ環境のグローバル変数をESLintで認識させるための設定
import tseslint from "typescript-eslint"; // TypeScript用のESLintルールとパーサーを提供するパッケージ

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] }, // 対象とするファイルのパターンを指定。JavaScript、TypeScript、JSX、TSXファイルが対象
  { languageOptions: { globals: globals.browser } }, // ブラウザのグローバル変数（例：window, document）をESLintに認識させる
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "no-fallthrough": "error", // switch文のfallthroughを禁止
      "no-console": "warn", // 試し
      // ...tseslint.configs.recommendedでerrorになってしまうのでここで改めて制御
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // 関数の引数に対して適用
          varsIgnorePattern: "^_", //  変数に対して適用
          caughtErrorsIgnorePattern: "^_", // try...catch文でキャッチしたエラー（caught errors）に対して適用
          destructuredArrayIgnorePattern: "^_", // 分割代入（destructuring assignment）で定義された配列の要素に対して適用
        },
      ],
    },
  },

  eslintConfigPrettier, // ESLintとPrettierの競合を防ぐ設定。Prettierのルールを最優先にするための設定
];
