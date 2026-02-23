import { type ServerApplicationRouteParameters } from './server-application-route-parameters.type.js';

type ServerApplicationApi = {
    routes: ServerApplicationRouteParameters[];
    version: string;
};

export { type ServerApplicationApi };
