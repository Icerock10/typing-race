import { type Logger } from '~/libs/modules/logger/libs/types/types.js';

import {
    type APIHandler,
    type APIHandlerOptions,
    type Controller,
    type ControllerRouteParameters,
    type HandlerParameterIndexes,
    type ServerApplicationRouteParameters,
} from './libs/types/types.js';

class BaseController implements Controller {
    public routes: ServerApplicationRouteParameters[];

    private apiUrl: string;

    private logger: Logger;

    public constructor(logger: Logger, apiPath: string) {
        this.logger = logger;
        this.apiUrl = apiPath;
        this.routes = [];
    }

    public addRoute(options: ControllerRouteParameters): void {
        const { handler, path } = options;
        const fullPath = this.apiUrl + path;

        this.routes.push({
            ...options,
            handler: (request, reply) =>
                this.mapHandler(handler, request, reply),
            path: fullPath,
        });
    }

    private async mapHandler(
        handler: APIHandler,
        request: Parameters<
            ServerApplicationRouteParameters['handler']
        >[typeof HandlerParameterIndexes.FIRST_PARAM_INDEX],
        reply: Parameters<
            ServerApplicationRouteParameters['handler']
        >[typeof HandlerParameterIndexes.SECOND_PARAM_INDEX],
    ): Promise<void> {
        this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);

        const handlerOptions: APIHandlerOptions = {
            body: request.body,
            originalRequest: request as never,
            params: request.params,
            query: request.query,
            user: request.user,
        };
        const { headers, payload, status } = await handler(handlerOptions);

        if (headers) {
            for (const [key, value] of Object.entries(headers)) {
                reply.header(key, value);
            }
        }

        return await reply.status(status).send(payload);
    }
}

export { BaseController };
