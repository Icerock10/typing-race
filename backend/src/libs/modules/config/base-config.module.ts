import convict, { type Config as LibraryConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type Logger } from '~/libs/modules/logger/libs/types/types.js';

import { type Config, type EnvironmentSchema } from './libs/types/types.js';

class BaseConfig implements Config {
    public ENV: EnvironmentSchema;
    private logger: Logger;

    private get envSchema(): LibraryConfig<EnvironmentSchema> {
        return convict<EnvironmentSchema>({
            APP: {
                ENVIRONMENT: {
                    default: null,
                    doc: 'Application environment',
                    env: 'NODE_ENV',
                    format: Object.values(AppEnvironment),
                },
                HOST: {
                    default: null,
                    doc: 'Host for server app',
                    env: 'HOST',
                    format: String,
                },
                PORT: {
                    default: null,
                    doc: 'Port for incoming connections',
                    env: 'PORT',
                    format: Number,
                },
            },
            DB: {
                CONNECTION_STRING: {
                    default: null,
                    doc: 'Connection string to DB',
                    env: 'DB_CONNECTION_STRING',
                    format: String,
                },
            },
            TOKEN: {
                ENCRYPTION: {
                    default: null,
                    doc: 'Encryption algorithm for JWTs',
                    env: 'JWT_ENCRYPTION',
                    format: String,
                },
                EXPIRATION: {
                    default: null,
                    doc: 'Expiration time for JWTs',
                    env: 'JWT_EXPIRATION',
                    format: String,
                },
                SECRET: {
                    default: null,
                    doc: 'Secret key for JWTs',
                    env: 'JWT_SECRET_KEY',
                    format: String,
                },
            },
        });
    }

    public constructor(logger: Logger) {
        this.logger = logger;
        config();

        this.envSchema.load({});
        this.envSchema.validate({
            allowed: 'strict',
            output: (message) => {
                this.logger.info(message);
            },
        });

        this.ENV = this.envSchema.getProperties();
        this.logger.info('.env file found and successfully parsed!');
    }
}

export { BaseConfig };
