process.env.ZAIUS_ENV = 'test';

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node"
  ],
  verbose: true,
  testEnvironment: 'node'
};
