import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
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
    files: ['**/*.ts', '**/*.tsx'],
    ...tseslint.configs.recommended[0],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
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
  {
    files: ['**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/alt-text': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  { ignores: ['dist/', 'node_modules/'] },
];
