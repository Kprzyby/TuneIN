// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const tsconfigPath = path.resolve(
  (() => {
    const cwd = process.cwd();

    if (cwd.endsWith("tunein")) {
      return "./tunein-client/tsconfig.json";
    }

    return "tsconfig.json";
  })()
);

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "airbnb",
    "airbnb/hooks",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    "no-restricted-syntax": "off",
    "react/jsx-no-constructed-context-values": "off",
    "jsx-a11y/media-has-caption": "off",
    "react-hooks/rules-of-hooks": "off",
    "@typescript-eslint/no-var-requires": "off",
    "react/jsx-no-constructed-context-value": "off",
    "react/function-component-definition": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "@typescript-eslint/no-empty-function": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "react/jsx-no-useless-fragment": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "react-hooks/exhaustive-deps": "off",
    "no-empty-interface": 0,
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/dot-notation": "off",
    "no-use-before-define": "off",
    "react/no-danger": "off",
    "@next/next/no-document-import-in-page": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "import/extensions": 0,
    "react/jsx-props-no-spreading": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "arrow-body-style": ["error", "as-needed"],
    "react/require-default-props": 0,
    "no-shadow": "off",
    "jsx-a11y/anchor-is-valid": 0,
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      {
        blankLine: "always",
        prev: ["const", "let", "var"],
        next: "*",
      },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: true,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "type",
          "index",
        ],
        pathGroups: [
          {
            pattern: "./styles.ts",
            group: "sibling",
          },
        ],
        "newlines-between": "always",
      },
    ],
    "no-restricted-exports": "off",
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "_+",
        varsIgnorePattern: "_+",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "_+",
        varsIgnorePattern: "_+",
      },
    ],
    "no-underscore-dangle": [
      "error",
      {
        allow: [
          "_ref",
          "_type",
          "_id",
          "__typename",
          "_key",
          "__IS_STORYBOOK",
          "_original",
        ],
      },
    ],
    "no-console": [
      "warn",
      {
        allow: ["warn"],
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: tsconfigPath,
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        "prettier",
      ],
    },
  ],
};
