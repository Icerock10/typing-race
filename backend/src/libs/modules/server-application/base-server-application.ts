import fastifyStatic from '@fastify/static';
import Fastify, { type FastifyError, type FastifyInstance } from 'fastify';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { HTTPCode, HTTPError } from '~/libs/enums/enums.js';
import { type SocketService } from '~/libs/modules/socket/libs/types/types.js';
import { userService } from '~/features/users/users.js';

import {
    authorization as authorizationPlugin,
    socket as socketPlugin,
} from '~/plugins/plugins.js';

import {
    type ServerApplication,
    type ServerApplicationApi,
    type ServerApplicationRouteParameters,
    type Config,
    type DataBase,
    type Logger,
    type ValidationError,
    type ServerValidationErrorResponse,
    type ValidationSchema,
    ServerErrorType,
    type ServerCommonErrorResponse,
} from './libs/types/types.js';

type Constructor = {
    apis: ServerApplicationApi[];
    config: Config;
    database: DataBase;
    logger: Logger;
    socket: SocketService;
};

type ValidationResult = { error?: Error; value?: unknown };

type WhiteRoute = { method: string; path: string };

class BaseServerApplication implements ServerApplication {
    private apis: ServerApplicationApi[];

    private socket: SocketService;

    private app: FastifyInstance;

    private config: Config;

    private database: DataBase;

    private logger: Logger;

    public constructor({
        apis,
        config,
        database,
        logger,
        socket,
    }: Constructor) {
        this.config = config;
        this.socket = socket;
        this.logger = logger;
        this.apis = apis;
        this.database = database;
        this.app = Fastify({
            routerOptions: {
                ignoreTrailingSlash: true,
            },
        });
    }

    public addRoutes(parameters: ServerApplicationRouteParameters[]): void {
        for (const parameter of parameters) {
            const { handler, method, path, validation } = parameter;

            this.app.route({
                handler,
                method,
                schema: {
                    body: validation?.body,
                },
                url: path,
            });

            this.logger.info(`Route: ${method} ${path} is registered`);
        }
    }

    public async init(): Promise<void> {
        this.logger.info('Application initialization');

        await this.initServe();
        this.socket.initializeIo(this.app.server);
        await this.initPlugins();
        this.initErrorHandler();
        this.initRoutes();
        this.initValidationCompiler();
        await this.database.connect();

        try {
            await this.app.listen({
                host: this.config.ENV.APP.HOST,
                port: this.config.ENV.APP.PORT,
            });

            this.logger.info(
                `Application is listening on PORT ${this.config.ENV.APP.PORT.toString()}, on ENVIRONMENT ${
                    this.config.ENV.APP.ENVIRONMENT as string
                }.`,
            );
        } catch (error) {
            if (error instanceof Error) {
                this.logger.error(error.message, {
                    cause: error.cause,
                    stack: error.stack,
                });
            }

            throw error;
        }
    }

    public initRoutes(): void {
        const routers = this.apis.flatMap((api) => api.routes);

        this.addRoutes(routers);
    }

    private getWhiteRoutes(): WhiteRoute[] {
        const publicApiRoutes: WhiteRoute[] = this.apis.flatMap((api) =>
            api.routes
                .filter((route) => route.isPublic)
                .map((route) => ({
                    method: route.method,
                    path: route.path,
                })),
        );

        return publicApiRoutes;
    }

    private initErrorHandler(): void {
        this.app.setErrorHandler(
            (error: FastifyError | ValidationError, _request, reply) => {
                if ('issues' in error) {
                    this.logger.error(`[Validation Error]: ${error.message}`);

                    for (let issue of error.issues) {
                        this.logger.error(
                            `[${issue.path.toString()}] — ${issue.message}`,
                        );
                    }

                    const response: ServerValidationErrorResponse = {
                        details: error.issues.map((issue) => ({
                            message: issue.message,
                            path: issue.path,
                        })),
                        errorType: ServerErrorType.VALIDATION,
                        message: error.message,
                    };

                    return reply
                        .status(HTTPCode.UNPROCESSED_ENTITY)
                        .send(response);
                }

                if (error instanceof HTTPError) {
                    this.logger.error(
                        `[HTTP Error]: ${String(error.status)} – ${error.message}`,
                    );

                    const response: ServerCommonErrorResponse = {
                        errorType: ServerErrorType.COMMON,
                        message: error.message,
                    };

                    return reply.status(error.status).send(response);
                }

                this.logger.error(error.message);

                const response: ServerCommonErrorResponse = {
                    errorType: ServerErrorType.COMMON,
                    message: error.message,
                };

                return reply
                    .status(HTTPCode.INTERNAL_SERVER_ERROR)
                    .send(response);
            },
        );
    }

    private async initPlugins(): Promise<void> {
        await this.app.register(authorizationPlugin, {
            userService,
            whiteRoutes: this.getWhiteRoutes(),
        });
        await this.app.register(socketPlugin, { io: this.socket.io });
    }

    private async initServe(): Promise<void> {
        const staticPath = path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            '../../../../backend/public',
        );

        await this.app.register(fastifyStatic, {
            prefix: '/',
            root: staticPath,
        });

        this.app.setNotFoundHandler(async (_request, response) => {
            await response.sendFile('index.html', staticPath);
        });
    }

    private initValidationCompiler(): void {
        this.app.setValidatorCompiler<ValidationSchema>(({ schema }) => {
            return (validationData): ValidationResult => {
                const { data, error, success } =
                    schema.safeParse(validationData);

                return success ? { value: data } : { error };
            };
        });
    }
}

export { BaseServerApplication };
