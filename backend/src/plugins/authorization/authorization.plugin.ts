import { type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { token } from '~/libs/modules/token/token.js';
import { type UserService } from '~/features/users/user.service.js';

import {
    AuthorizationError,
    ErrorMessage,
    type UserDto,
} from './libs/types/types.js';

type AuthPluginOptions = {
    userService: UserService;
    whiteRoutes: Array<{ method: string; path: string }>;
};

const authStrategy = 'Bearer ';

const extractUserFromRequest = async (
    request: FastifyRequest,
    userService: UserService,
): Promise<UserDto> => {
    try {
        const { authorization } = request.headers;

        if (!authorization?.startsWith(authStrategy)) {
            throw new AuthorizationError({
                message: ErrorMessage.AUTHORIZATION_HEADER_MISSING,
            });
        }

        const tokenValue = authorization.replace(authStrategy, '');

        const payload = await token.decode(tokenValue);

        const user = await userService.find(payload.userId);

        if (!user) {
            throw new AuthorizationError({
                message: ErrorMessage.USER_NOT_FOUND,
            });
        }

        return user;
    } catch (error) {
        if (error instanceof Error) {
            throw new AuthorizationError({
                cause: error,
                message: ErrorMessage.AUTHENTICATION_FAILED,
            });
        }

        throw new AuthorizationError({
            message: ErrorMessage.AUTHENTICATION_FAILED,
        });
    }
};

const checkIsWhiteRoute = (
    url: string,
    method: string,
    whiteRoutes: Array<{ method: string; path: string }>,
): boolean => {
    const apiRouteRegex = /^\/api\/v\d+(\/.+)$/;
    const isAPIRoute = apiRouteRegex.test(url);

    if (!isAPIRoute) {
        return true;
    }

    const [routeWithoutQuery] = url.split('?');

    const normalizedMethod = method.toUpperCase();

    return whiteRoutes.some(
        (route) =>
            route.path === routeWithoutQuery &&
            route.method.toUpperCase() === normalizedMethod,
    );
};

const authorization = fp<AuthPluginOptions>(
    (fastify, { userService, whiteRoutes }, done) => {
        fastify.decorate(
            'authenticate',
            async function (request: FastifyRequest) {
                request.user = await extractUserFromRequest(
                    request,
                    userService,
                );
            },
        );

        fastify.addHook('preHandler', async (request: FastifyRequest) => {
            const routeUrl = request.routeOptions.url ?? request.url;

            const isWhiteRoute = checkIsWhiteRoute(
                routeUrl,
                request.method,
                whiteRoutes,
            );

            if (isWhiteRoute) {
                return;
            }

            await request.server.authenticate(request);
        });

        done();
    },
);

export { authorization };
