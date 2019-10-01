module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsConfig: "tsconfig.json",
    },
  },
  rootDir: "src",
  transform: { "^.+\\.ts?$": "ts-jest" },
  testEnvironment: "node",
  testRegex: "\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  preset: "ts-jest",
};
