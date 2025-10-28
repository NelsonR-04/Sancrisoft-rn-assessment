import expoConfig from 'eslint-config-expo/flat.js';
import prettier from 'eslint-plugin-prettier';
import regexp from 'eslint-plugin-regexp';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  ...expoConfig,
  {
    ignores: ['dist/*', 'node_modules/*', '.expo/*'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      prettier,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      regexp,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
        },
      ],
      'linebreak-style': 0,
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'regexp/no-super-linear-backtracking': 'error',
      'regexp/no-useless-escape': 'error',
      'regexp/strict': 'error',
      'regexp/no-lazy-ends': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^\\u0000',
              '^react',
              '^@?w',
              '^@/',
              '^..(?!/?$)',
              '^../?$',
              '^./(?=.*/)(?!/?$)',
              '^.(?!/?$)',
              '^./?$',
            ],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      'no-console': 'off',
      'no-inline-comments': 'error',
      'no-shadow': 'off',
      'no-undef': 'off',
      'no-prototype-builtins': 'off',
      'sort-imports': 'off',
    },
  },
];
