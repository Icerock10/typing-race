import baseConfig from '../eslint.config.js';

const ignoresConfig = {
  ignores: ['build'],
};

const overridesConfigs = [{}];

const config = [...baseConfig, ignoresConfig, ...overridesConfigs];

export default config;
