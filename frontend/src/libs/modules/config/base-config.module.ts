import { AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type Config, type EnvironmentSchema } from './libs/types/types.js';

class BaseConfig implements Config {
    public ENV: EnvironmentSchema;

    private get envSchema(): EnvironmentSchema {
        const isProduction =
            import.meta.env['VITE_APP_NODE_ENV'] === AppEnvironment.PRODUCTION;
        const baseUrl = isProduction
            ? (import.meta.env['VITE_APP_PRODUCTION_URL'] as string)
            : (import.meta.env['VITE_APP_PROXY_SERVER_URL'] as string);
        return {
            API: {
                ORIGIN_URL: import.meta.env[
                    'VITE_APP_API_ORIGIN_URL'
                ] as string,
                BASE_URL: baseUrl,
            },
            APP: {
                ENVIRONMENT: import.meta.env['VITE_APP_NODE_ENV'] as ValueOf<
                    typeof AppEnvironment
                >,
            },
        };
    }

    public constructor() {
        this.ENV = this.envSchema;
    }
}

export { BaseConfig };
