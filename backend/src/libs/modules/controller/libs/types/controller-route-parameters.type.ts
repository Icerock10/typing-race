import { type HTTPMethod, type ValidationSchema } from '~/libs/types/types.js';

import { type APIHandler } from './types.js';

type ControllerRouteParameters = {
    handler: APIHandler;
    isPublic?: boolean;
    method: HTTPMethod;
    path: string;
    validation?: {
        body?: ValidationSchema;
    };
};

export { type ControllerRouteParameters };
