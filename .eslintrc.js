module.exports = {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:jsdoc/recommended-typescript"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    ignorePatterns: [".eslintrc.js"],
    rules: {
        eqeqeq: ["error", "always", { null: "ignore" }],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "jsdoc/tag-lines": ["warn", "any", { startLines: 1 }],
        "jsdoc/tag-lines": 0,
        "jsdoc/check-param-names": 0,
        "jsdoc/no-undefined-types": 0,
        "jsdoc/require-description": 1,
    },
};
