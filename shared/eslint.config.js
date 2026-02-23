import baseConfig from '.././eslint.config.js';

const ignoresConfig = {
    ignores: ['build'],
};

const config = [...baseConfig, ignoresConfig];

export default config;
