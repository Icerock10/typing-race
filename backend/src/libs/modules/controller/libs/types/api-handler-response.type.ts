import { type ValueOf, type HTTPCode } from '~/libs/types/types.js';

type APIHandlerResponse = {
    headers?: Record<string, string>;
    payload: unknown;
    status: ValueOf<typeof HTTPCode>;
};

export { type APIHandlerResponse };
