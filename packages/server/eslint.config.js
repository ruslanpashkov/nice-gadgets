import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    rules: {
      indent: 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'operator-linebreak': 'off',
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'max-len': ['error', { code: 140 }],
      'no-self-assign': ['error', { props: true }],
      'no-var': 'error',
      'no-empty-function': 'error',
      'for-direction': 'error',
      'no-self-compare': 'error',
      eqeqeq: ['error', 'always'],
      'dot-notation': 'error',
      'default-case': 'warn',
      curly: 'error',
      'init-declarations': ['warn', 'always'],
      'no-invalid-this': 'error',
      'no-lonely-if': 'warn',
      'no-return-assign': 'error',
      'no-useless-return': 'warn',
      'prefer-destructuring': [
        'warn',
        {
          array: true,
          object: true,
        },
      ],
      'array-bracket-spacing': ['warn', 'never'],
      'brace-style': ['error', '1tbs'],
      'comma-spacing': [
        'error',
        {
          before: false,
          after: true,
        },
      ],
      'comma-style': ['error', 'last'],
      'computed-property-spacing': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
        },
      ],
      'key-spacing': [
        'warn',
        {
          mode: 'strict',
          beforeColon: false,
          afterColon: true,
        },
      ],
      'keyword-spacing': [
        'error',
        {
          before: true,
          after: true,
        },
      ],
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: false,
        },
      ],
      'no-multi-spaces': [
        'error',
        {
          ignoreEOLComments: false,
        },
      ],
      'no-trailing-spaces': [
        'error',
        {
          skipBlankLines: true,
          ignoreComments: false,
        },
      ],
      'rest-spread-spacing': ['error', 'never'],
      'semi-spacing': [
        'warn',
        {
          before: false,
          after: true,
        },
      ],
      'semi-style': ['error', 'last'],
      'template-curly-spacing': ['error', 'never'],
      'switch-colon-spacing': [
        'error',
        {
          after: true,
          before: false,
        },
      ],
      'no-whitespace-before-property': 'warn',
      'no-duplicate-imports': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    ...tseslint.configs.recommended[0],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  { ignores: ['dist/', 'node_modules/'] },
];
