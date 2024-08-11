/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};


// import type {Config} from 'jest';

// const config: Config = {
//   verbose: true,
// };

// export default config;