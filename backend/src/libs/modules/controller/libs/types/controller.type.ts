import {
    type ControllerRouteParameters,
    type ServerApplicationRouteParameters,
} from './types.js';

type Controller = {
    addRoute(options: ControllerRouteParameters): void;
    routes: ServerApplicationRouteParameters[];
};

export { type Controller };
