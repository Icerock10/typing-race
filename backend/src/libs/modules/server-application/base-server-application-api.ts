import {
    type ServerApplicationApi,
    type ServerApplicationRouteParameters,
} from './libs/types/types.js';

class BaseServerApplicationApi implements ServerApplicationApi {
    public routes: ServerApplicationRouteParameters[];

    public version: string;

    public constructor(
        version: string,
        ...handlers: ServerApplicationRouteParameters[]
    ) {
        this.version = version;

        this.routes = handlers.map((handler) => ({
            ...handler,
            path: `/api/${this.version}${handler.path}`,
        }));
    }
}

export { BaseServerApplicationApi };
