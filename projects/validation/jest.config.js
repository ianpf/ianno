module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "\.(test|spec)\\.(jsx?|tsx?)$",
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
