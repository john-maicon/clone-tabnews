//  arquivo para definir comportamento do JEST

const nextJest = require("next/jest");
const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

const crateJestConfig = nextJest({
  dir: ".",
});
const jestConfig = crateJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 6000
});

module.exports = jestConfig;
