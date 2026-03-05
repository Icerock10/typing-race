import { type RouteObject } from 'react-router-dom';

import { AppRoute, RouteAccess } from './libs/enums/enums.js';
import { Auth, Lobby, NotFound, Race } from './pages/pages.js';

type CustomRouteObject = RouteObject & { handle: RouteHandle };

type RouteHandle = {
    access: (typeof RouteAccess)[keyof typeof RouteAccess];
};

const routes: CustomRouteObject[] = [
    {
        element: <Lobby />,
        handle: {
            access: RouteAccess.PUBLIC,
        },
        path: AppRoute.LOBBY,
    },
    {
        element: <Race />,
        handle: {
            access: RouteAccess.AUTHENTICATED,
        },
        path: AppRoute.RACE,
    },
    {
        element: <Auth />,
        handle: {
            access: RouteAccess.NOT_AUTHENTICATED,
        },
        path: AppRoute.AUTH,
    },
    {
        element: <NotFound />,
        handle: {
            access: RouteAccess.PUBLIC,
        },
        path: AppRoute.NOT_FOUND,
    },
];

export { routes };
export { type RouteHandle };
