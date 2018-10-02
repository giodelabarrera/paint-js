module.exports = {
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}"
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"
  ],
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    "\\.(sass|css|less)$": "identity-obj-proxy"
  }
};
