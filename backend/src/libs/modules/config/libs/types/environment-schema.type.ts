import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
    APP: {
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
        HOST: string;
        PORT: number;
    };
    DB: {
        CONNECTION_STRING: string;
    };
    TOKEN: {
        ENCRYPTION: string;
        EXPIRATION: string;
        SECRET: string;
    };
};

export { type EnvironmentSchema };
