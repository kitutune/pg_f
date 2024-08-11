import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // ブラウザ環境を模倣するための設定
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // 追加のセットアップファイルを指定
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // CSSモジュールのマッピング
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // サポートする拡張子のリスト
};

export default config;
