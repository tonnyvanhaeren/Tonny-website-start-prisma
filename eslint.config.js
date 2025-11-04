/* eslint.config.js */
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tanstackQuery from '@tanstack/eslint-plugin-query';

export default [
  js.configs.recommended,

  {
    ignores: ['node_modules', 'dist', 'build', '.next', 'coverage'],
  },

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json'], // set if you want type-aware rules
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      // Registers the TanStack Query plugin
      '@tanstack/query': tanstackQuery,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // TypeScript recommended (non-type-aware). If you enabled "project", consider type-aware configs.
      ...tsPlugin.configs.recommended.rules,

      // TanStack Query recommended rules
      ...tanstackQuery.configs['flat/recommended'].rules,

      // Optional stricter recommendations:
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
    },
  },
];
