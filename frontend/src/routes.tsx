import { type RouteObject } from 'react-router-dom';

import { AppRoute, RouteAccess } from './libs/enums/enums.js';
import { Auth, Dashboard, Home, NotFound } from './pages/pages.js';

type CustomRouteObject = RouteObject & { handle: RouteHandle };

type RouteHandle = {
    access: (typeof RouteAccess)[keyof typeof RouteAccess];
};

const routes: CustomRouteObject[] = [
    {
        element: <Home />,
        handle: {
            access: RouteAccess.PUBLIC,
        },
        path: AppRoute.ROOT,
    },
    {
        element: <Auth />,
        handle: {
            access: RouteAccess.NOT_AUTHENTICATED,
        },
        path: AppRoute.SIGN_IN,
    },
    {
        element: <Auth />,
        handle: {
            access: RouteAccess.NOT_AUTHENTICATED,
        },
        path: AppRoute.SIGN_UP,
    },
    {
        element: <NotFound />,
        handle: {
            access: RouteAccess.PUBLIC,
        },
        path: AppRoute.NOT_FOUND,
    },
    {
        element: <Dashboard />,
        handle: {
            access: RouteAccess.AUTHENTICATED,
        },
        path: AppRoute.DASHBOARD,
    },
];

export { routes };
export { type RouteHandle };
