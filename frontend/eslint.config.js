import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import baseConfig from '.././eslint.config.js';

const ignoresConfig = {
    ignores: ['build', 'packages.d.ts'],
};

const mainConfig = {
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
            JSX: true,
            React: true,
        },
    },
    rules: {
        'sonarjs/void-use': 'off',
    },
};

const reactConfig = {
    files: ['**/*.tsx'],
    plugins: {
        react,
    },
    rules: {
        ...react.configs['jsx-runtime'].rules,
        ...react.configs['recommended'].rules,
        'react/jsx-boolean-value': ['error'],
        'react/jsx-curly-brace-presence': ['error'],
        'react/jsx-no-bind': ['error', { ignoreRefs: true }],
        'react/prop-types': 'off',
        'react/self-closing-comp': ['error'],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};

const reactHooksConfig = {
    files: ['**/*.tsx'],
    plugins: {
        'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
};

const jsxA11yConfig = {
    files: ['**/*.tsx'],
    plugins: {
        'jsx-a11y': jsxA11y,
    },
    rules: jsxA11y.configs.recommended.rules,
};

const overridesConfigs = [
    {
        files: ['vite.config.ts'],
        rules: {
            'import/no-default-export': ['off'],
            'import/no-default-import': ['off'],
        },
    },
    {
        files: ['src/vite-env.d.ts'],
        rules: {
            'unicorn/prevent-abbreviations': ['off'],
        },
    },
    {
        files: ['src/index.tsx'],
        rules: {
            'unicorn/prefer-top-level-await': 'off',
        },
    },
];

const config = [
    ...baseConfig,
    ignoresConfig,
    mainConfig,
    reactConfig,
    reactHooksConfig,
    jsxA11yConfig,
    ...overridesConfigs,
];

export default config;
