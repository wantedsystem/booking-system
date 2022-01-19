module.exports = {
    extends: [
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier"
    ],
    plugins: ["prettier"],
    env: {
        browser: true,
        amd: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        "prettier/prettier": ["error", {}, { usePrettierrc: true }],
        "no-console": "warn",
        "react/display-name": "off"
    }
};
