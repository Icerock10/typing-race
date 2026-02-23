import { type ServerApplicationRouteParameters } from './server-application-route-parameters.type.js';

type ServerApplication = {
    addRoutes(parameters: ServerApplicationRouteParameters[]): void;
};

export { type ServerApplication };
