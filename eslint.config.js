const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,

  // Backend Node.js
  {
    files: ["**/*.js"],
    ignores: ["public/**", "app.test.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },

  // Frontend Browser
  {
    files: ["public/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  {
  files: ["**/*.test.js", "app.test.js"],
  languageOptions: {
    sourceType: "commonjs",
    globals: {
      ...globals.node,
      ...globals.jest,
    },
  },
},
];