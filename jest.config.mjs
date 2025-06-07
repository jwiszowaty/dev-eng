// jest.config.mjs
export default {
  testEnvironment: "node", // Use "jsdom" if you're testing browser code
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  setupFiles: ["<rootDir>/jest.setup.js"], // optional, for loading environment variables
};