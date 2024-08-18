// prettier.config.ts

import { Options } from 'prettier';

const config: Options = {
  semi: true, // 行末にセミコロンを追加
  singleQuote: true, // シングルクオートを使用
  trailingComma: 'all', // 複数行の要素の最後にカンマを追加
  printWidth: 80, // 1行の最大長を80文字に制限
  tabWidth: 2, // インデント幅を2スペースに設定
  useTabs: false, // タブではなくスペースを使用
  bracketSpacing: true, // オブジェクトリテラルの括弧内にスペースを追加
  arrowParens: 'always', // アロー関数の引数に括弧を常に追加
  endOfLine: 'lf', // 改行コードをLFに統一（Unixスタイル）
};

export default config;
