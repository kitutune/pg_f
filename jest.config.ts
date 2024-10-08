import type { Config } from "jest";

const config: Config = {
  extensionsToTreatAsEsm:['.ts', '.tsx'], // ESMとして扱う拡張子
  /**
   * presetオプションは、Jestの設定を簡略化するためのテンプレートを提供します。
   * "ts-jest" を指定することで、TypeScriptコードをそのままテストするための設定が適用されます。
   * 
   * - 意図: TypeScriptコードをトランスパイルせずに直接テストする。
   * - メリット: 簡単にTypeScriptサポートを導入でき、追加の設定が不要。
   * - デメリット: プリセットに依存するため、カスタマイズが制限される場合があります。
  */
 // preset: "ts-jest/presets/default-esm",
 preset: "ts-jest",
 
 /**
  * testEnvironmentオプションは、テストを実行する際の環境を指定します。
  * "jsdom" を使用することで、ブラウザライクな環境が提供され、DOM操作が可能になります。
  * 
  * - 意図: Reactコンポーネントやブラウザ依存のコードをテストするため。
  * - メリット: ブラウザのAPIが利用可能になるため、UIのテストに適している。
  * - デメリット: Node.js固有の環境では動作が異なるため、環境依存のテストは注意が必要。
 */
testEnvironment: "jsdom",

/**
 * setupFilesAfterEnvは、各テストが実行される前にセットアップされるファイルを指定します。
 * カスタムマッチャーの設定やグローバルなモック、テストフレームワークの初期化に使用されます。
 * 
 * - 意図: テスト環境をカスタマイズして統一された初期化処理を実施するため。
 * - メリット: 重複する初期化コードを削減し、テストの一貫性を保つ。
 * - デメリット: 複雑な設定やグローバルな副作用が発生しやすく、テストが意図しない方法で影響を受けるリスクがある。
*/
setupFilesAfterEnv:["./src/setupTests.ts"],
// setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  /**
   * moduleNameMapperは、モジュールのパスをカスタムパターンにマッピングするために使用されます。
   * これにより、パスエイリアスやファイルモックを設定できます。
   * 
   * - 意図: 複雑なパスや依存関係の解決を簡略化するため。
   * - tsconfig.jsonのpathsに近い
   * - paths ： TypeScript のコンパイル時に適用される設定で、TypeScriptがモジュールを解決するために使用
   * - moduleNameMapper ： Jest のテスト実行時に適用され、Jest がモジュールを解決するために使用
   * - 整合性の確保: paths と moduleNameMapper が同じマッピングを持つように設定しないとただただ混乱の元
   * - 例: "@/components/Button" を "<rootDir>/src/components/Button" にマッピング。
   * - メリット: コードの可読性が向上し、パスの冗長性が削減される。
   * - デメリット: 不適切なマッピングが設定されると、依存関係の解決が困難になる。
   */
  // moduleNameMapper: {
  //   "^@/(.*)$": "<rootDir>/src/$1", // パスエイリアスの設定
  //   "\\.(css|less|scss|sass)$": "identity-obj-proxy", // CSSモジュールのスタブ設定
  // },

  /**
   * transformオプションは、テスト中にファイルをどのように処理するかを指定します。
   * TypeScriptファイル（.ts, .tsx）をトランスパイルするために "ts-jest" を使用しています。
   * 
   * - 意図: TypeScriptで記述されたコードをJestでテスト可能にするため。
   * - 例: "^.+\\.[tj]sx?$" は、.ts, .tsx, .js, .jsx ファイルを対象にします。
   * - メリット: TypeScriptコードを直接テストできるため、トランスパイル手順が簡略化。
   * - デメリット: 大規模なプロジェクトではトランスパイル時間が増加する可能性がある。
   * 
   * isolatedModules: true を使用することで、TypeScriptファイルのトランスパイルを高速化。
   */
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: './tsconfig.app.json', // tsconfigファイルを指定
      isolatedModules: true, // isolatedModulesを追加
    }],
  },

  /**
   * testPathIgnorePatternsは、Jestがテスト実行を無視するパスのリストを指定します。
   * "node_modules" や "dist" ディレクトリなど、テストの対象としないディレクトリを指定します。
   * 
   * - 意図: 不要なディレクトリを除外してテスト実行を効率化するため。
   * - メリット: テストスピードが向上し、無関係なファイルがテストされるリスクが減少。
   * - デメリット: 除外リストに必要なファイルが含まれると、重要なテストがスキップされる可能性がある。
   */
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/.next/"],

  /**
   * moduleFileExtensionsは、Jestが解決可能なファイル拡張子のリストを指定します。
   * TypeScriptやJavaScript、JSONファイルを含むように設定します。
   * 
   * - 意図: サポートするファイル拡張子を指定して、適切なモジュール解決を行うため。
   * - 例: ["ts", "tsx", "js", "jsx", "json", "node"]
   * - メリット: さまざまなファイル形式に対応でき、モジュール解決の範囲が広がる。
   * - デメリット: 拡張子が多すぎると、モジュール解決が遅くなる可能性がある。
   */
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  /**
   * maxWorkersオプションは、テスト実行時に使用する最大ワーカープロセス数を制限します。
   * システムリソースを効率的に使用しつつ、テストのパフォーマンスを最適化します。
   * 
   * - 意図: 並列実行の最適化とシステムリソースの効率的な利用。
   * - メリット: ワーカープロセスが過剰に消費するリソースを制限し、安定したテスト実行を確保。
   * - デメリット: ワーカー数が少なすぎるとテスト時間が長くなる可能性がある。
   */
  maxWorkers: "50%",


  /**
   * testTimeoutオプションは、各テストが実行される際のタイムアウト時間をミリ秒単位で指定します。
   * 複雑なテストや外部サービスと連携するテストの場合に、十分なタイムアウト時間を設定します。
   * 
   * - 意図: テストが意図せずタイムアウトすることを防ぐために、適切なタイムアウト時間を設定。
   * - メリット: タイムアウトによるテスト失敗を防ぎ、テストの信頼性が向上。
   * - デメリット: タイムアウト時間を長く設定しすぎると、実際の問題が検出されにくくなる可能性がある。
   */
  testTimeout: 30000,
};

export default config;
