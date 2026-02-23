import { type APIHandlerOptions, type APIHandlerResponse } from './types.js';

type APIHandler = (
    options: APIHandlerOptions,
) => APIHandlerResponse | Promise<APIHandlerResponse>;

export { type APIHandler };
