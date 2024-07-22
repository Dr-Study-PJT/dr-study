module.exports = {
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "type-enum": [2, "always", ["main", "dev", "feature", "chore", "fix"]],
    "subject-case": [2, "always", "sentence-case"],
    "header-pattern": [2, "always", /^(main|dev|chore|fix): \w+|^feature\(\w+\): \[\w+\] \w+/],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};
