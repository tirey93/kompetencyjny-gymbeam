module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "unused-imports",
        "simple-import-sort",
        "prettier",
        "react-native",
    ],
    extends: [
        "expo",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/warnings",
        "prettier",
        "plugin:react-native/all",
    ],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "unused-imports/no-unused-imports": "error",
        quotes: ["warn", "double", { avoidEscape: true }],
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-var-requires": "off",
        "react/react-in-jsx-scope": "off",
        "prettier/prettier": [
            "error",
            {
                printWidth: 120,
                useTabs: false,
                tabWidth: 4,
                trailingComma: "es5",
                singleQuote: false,
                semi: true,
                bracketSpacing: true,
                bracketSameLine: false,
                arrowParens: "always",
                endOfLine: "auto",
            },
        ],
        "react-native/no-unused-styles": "error",
        "react-native/split-platform-components": "warn",
        "react-native/no-inline-styles": "warn",
        "react-native/no-color-literals": "warn",
        "react-native/no-raw-text": "off",
        "@typescript-eslint/no-require-imports": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            alias: {
                map: [
                    ["@api", "./api"],
                    ["@app", "./app"],
                    ["@assets", "./assets"],
                    ["@components", "./components"],
                    ["@constants", "./constants"],
                    ["@features", "./features"],
                    ["@hooks", "./hooks"],
                    ["@lib", "./lib"],
                    ["@types", "./types"],
                    [("@", "./")],
                ],
                extensions: [".ts", ".tsx", ".js", ".jsx"],
            },
        },
    },
    overrides: [
        {
            files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
            rules: {
                "simple-import-sort/imports": [
                    "error",
                    {
                        groups: [
                            ["^react", "^@?\\w"],
                            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                            ["^.+\\.?(scss)$", "^.+\\.?(less)$", "^.+\\.?(css)$", "^\\u0000"],
                        ],
                    },
                ],
            },
        },
    ],
    root: true,
};
