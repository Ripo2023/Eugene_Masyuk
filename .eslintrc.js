module.exports = {
  root: true,
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:styled-components-a11y/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"] // could be tsconfig.json too
  },
  plugins: [
    "react",
    "react-native",
    "react-hooks",
    "@typescript-eslint",
    "import",
    "prettier"
  ],
  rules: {
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ], // http://eslint.org/docs/rules/quotes
    // "prettier/prettier": ["error"],
    "import/prefer-default-export": "off",
    "import/newline-after-import": ["error", { count: 1 }],
    "no-console": "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    strict: ["error", "function"],
    "new-cap": [
      "error",
      {
        // http://eslint.org/docs/rules/new-cap
        newIsCap: true,
        capIsNew: false
      }
    ],
    "react/no-unescaped-entities": "off",
    "styled-components-a11y/no-autofocus": "off",
    "no-empty-function": "off",
    "no-use-before-define": "off",
    "import/no-unresolved": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-use-before-define": ["off"],
    "arrow-body-style": ["error", "as-needed"],
    camelcase: [
      "error",
      {
        properties: "never"
      }
    ],
    "newline-after-var": ["error", "always"],
    "newline-before-return": "error",
    "no-nested-ternary": "error", // http://eslint.org/docs/rules/no-nested-ternary
    "no-new-object": "error", // http://eslint.org/docs/rules/no-new-object
    "no-extra-parens": "off", // http://eslint.org/docs/rules/no-extra-parens
    "no-useless-escape": "off", //http://eslint.org/docs/rules/no-useless-escape
    "one-var": ["error", "never"], // http://eslint.org/docs/rules/one-var
    "arrow-body-style": "off",
    "no-underscore-dangle": "off", // http://eslint.org/docs/rules/no-underscore-dangle
    "@typescript-eslint/naming-convention": ["error"],
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/exhaustive-deps": [
      "off",
      {
        additionalHooks: "useDispatch|useOtherHookWhichWillDefinitelyNotChange"
      }
    ],
    "react/jsx-no-bind": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "import/order": [
      "error",
      {
        groups: ["external", ["parent", "sibling"]],
        pathGroups: [
          {
            pattern: "**/*.scss",
            group: "index",
            position: "after"
          }
        ],
        "newlines-between": "always"
      }
    ],
    "jsx-a11y/label-has-associated-control": "off",
  },
  env: {
    // es2021: true,
    node: true
  },
  parserOptions: {
    project: "tsconfig.json"
  },
  ignorePatterns: [
    ".eslintrc.js",
    "metro.config.js",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js",
    "index.js"
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", "*.ts", "*.tsx"],
        moduleDirectory: ["node_modules", "src/", "App.tsx"]
      }
    },
    "import/ignore": ["react-native"],
    react: {
      version: "detect"
    }
  }
};
