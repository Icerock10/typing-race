import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { resolve as tsResolver } from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

const JS_MAX_PARAMS_ALLOWED = 3;

const filesConfig = {
  files: ['**/*.{js,ts,tsx}'],
};

const ignoresConfig = {
  ignores: ['commitlint.config.ts', 'dangerfile.ts'],
};

const jsConfig = {
  languageOptions: {
    globals: globals.node,
    parserOptions: {
      ecmaVersion: 14,
      sourceType: 'module',
    },
  },
  rules: {
    ...js.configs.recommended.rules,
    'arrow-parens': ['error', 'always'],
    curly: ['error', 'all'],
    'max-params': ['error', JS_MAX_PARAMS_ALLOWED],
    'no-console': ['error'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        message: 'Export/Import all (*) is forbidden.',
        selector: 'ExportAllDeclaration,ImportAllDeclaration',
      },
      {
        message: 'Exports should be at the end of the file.',
        selector: 'ExportNamedDeclaration[declaration!=null]',
      },
      {
        message: 'TS features are forbidden.',
        selector: 'TSEnumDeclaration,ClassDeclaration[abstract=true]',
      },
      {
        message:
          'Avoid import/export type { Type } from `./module`. Prefer import/export { type Type } from `./module`.',
        selector: 'ImportDeclaration[importKind=type],ExportNamedDeclaration[exportKind=type]',
      },
    ],
    'object-shorthand': ['error'],
    'prefer-destructuring': ['error'],
    quotes: ['error', 'single'],
  },
};

const importConfig = {
  plugins: {
    import: importPlugin,
  },
  rules: {
    ...importPlugin.configs.recommended.rules,
    'import/exports-last': ['error'],
    'import/extensions': [
      'error',
      {
        js: 'always',
      },
    ],
    'import/newline-after-import': ['error'],
    'import/no-default-export': ['error'],
    'import/no-duplicates': ['error'],
  },
  settings: {
    'import/parsers': {
      espree: ['.js', '.cjs'],
    },
    'import/resolver': {
      typescript: tsResolver,
    },
  },
};

const unicornConfig = {
  plugins: {
    unicorn,
  },
  rules: {
    ...unicorn.configs.recommended.rules,
    'unicorn/no-null': ['off'],
  },
};

const typescriptConfig = {
  ignores: [
    'eslint.config.js',
    'lint-staged.config.js',
    'stylelint.config.js',
    'prettier.config.js',
  ],
  languageOptions: {
    parser: /** @type {ParserModule} */ (tsParser),
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': ts,
  },
  rules: {
    ...ts.configs['strict-type-checked'].rules,
    '@typescript-eslint/consistent-type-exports': ['error'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignoreEnums: true,
        ignoreReadonlyClassProperties: true,
      },
    ],
    '@typescript-eslint/return-await': ['error', 'always'],
  },
};

const overridesConfigs = [
  {
    files: [
      'commitlint.config.ts',
      'prettier.config.js',
      'stylelint.config.js',
      'lint-staged.config.js',
      'eslint.config.js',
    ],
    rules: {
      'import/no-default-export': ['off'],
    },
  },
  {
    files: ['*.js'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': ['off'],
    },
  },
];

const config = [
  filesConfig,
  ignoresConfig,
  jsConfig,
  importConfig,
  unicornConfig,
  typescriptConfig,
  ...overridesConfigs,
];

export default config;
