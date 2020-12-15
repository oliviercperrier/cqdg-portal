module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    ignorePatterns: ['.eslintrc.js'],
    plugins: ['react', '@typescript-eslint', 'jest', 'simple-import-sort', 'prefer-arrow', 'sort-destructure-keys'],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        'linebreak-style': 'off',
        'indent': ['error', 4],
        'simple-import-sort/imports': ['error', {
            groups: [
                // Side effect imports.
                ['^\\u0000'],
                // Packages. `react` related packages come first.
                ['^react', '^@?\\w'],
                // Internal packages.
                ['^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
                // Parent imports. Put `..` last.
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                // Other relative imports. Put same-folder imports and `.` last.
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                // Style imports.
                ['^.+\\.s?css$'],
            ],
        }],
        'simple-import-sort/exports': 'error',
        'sort-keys': ['error', 'asc', {
            'caseSensitive': false,
            'natural': true
        }],
        'sort-destructure-keys/sort-destructure-keys': ['error', {
            'caseSensitive': false
        }],
        'sort-vars': 'error',

        'prefer-arrow/prefer-arrow-functions': [
            'error',
            {
                'disallowPrototype': true,
                'singleReturnOnly': true,
                'classPropertiesAllowed': false
            }
        ],
        'arrow-body-style': ["error", "as-needed"],

        'quotes': ['warn', 'single'],

        'react/jsx-sort-default-props': 'error',
        'react/jsx-sort-props': 'error',

        'prefer-destructuring': ['error', {
            'array': false,
            'object': true
        }],
        'no-console': 'warn',
    },
};