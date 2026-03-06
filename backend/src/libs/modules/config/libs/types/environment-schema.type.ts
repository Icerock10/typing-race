import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
    APP: {
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
        HOST: string;
        PORT: number;
        CLIENT_DEVELOPMENT_SERVER_URL: string;
    };
    DB: {
        CONNECTION_STRING: string;
    };
    TOKEN: {
        ENCRYPTION: string;
        EXPIRATION: string;
        SECRET: string;
    };
    OPEN_AUTH: {
        DISCORD: {
            CLIENT_ID: string;
            CLIENT_SECRET: string;
        };
        BASE_CALLBACK_URI: string;
    };
};

export { type EnvironmentSchema };
