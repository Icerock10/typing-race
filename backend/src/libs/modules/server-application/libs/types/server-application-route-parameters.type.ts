import { type FastifyReply, type FastifyRequest } from 'fastify';

import { type HTTPMethod, type ValidationSchema } from '~/libs/types/types.js';

type ServerApplicationRouteParameters = {
    handler: (
        request: FastifyRequest,
        reply: FastifyReply,
    ) => Promise<void> | void;
    isPublic?: boolean;
    method: HTTPMethod;
    path: string;
    validation?: {
        body?: ValidationSchema;
        params?: ValidationSchema;
    };
};

export { type ServerApplicationRouteParameters };
