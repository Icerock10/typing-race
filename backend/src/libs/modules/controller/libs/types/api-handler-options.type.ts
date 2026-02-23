import { type FastifyRequest } from 'fastify';

import { type UserDto } from '~/libs/types/types.js';

type APIBodyOptions<T> = APIHandlerOptions<{ body: T }>;

type APIHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    originalRequest?: FastifyRequest;
    params: T['params'];
    query: T['query'];
    user: UserDto;
};

type AuthBodyOptions<T> = APIBodyOptions<T> & { user: { id: string } };

type AuthIdParametersOption = IdParametersOption & {
    user: {
        id: string;
    };
};

type DefaultApiHandlerOptions = {
    body?: unknown;
    params?: unknown;
    query?: unknown;
};

type IdParameter = {
    id: number;
};

type IdParametersOption = APIHandlerOptions<{ params: IdParameter }>;

type SearchQueryParametersOption<T> = APIHandlerOptions<{
    query: T;
}>;
export {
    type APIBodyOptions,
    type APIHandlerOptions,
    type AuthBodyOptions,
    type AuthIdParametersOption,
    type IdParametersOption,
    type SearchQueryParametersOption,
};
