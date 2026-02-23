import { Navigate, Outlet, useMatches } from 'react-router-dom';

import { Loader } from '~/libs/components/components.js';
import { HandlerParameterIndexes } from '~/libs/constants/constants.js';
import { AppRoute, DataStatus, RouteAccess } from '~/libs/enums/enums.js';
import { useAppSelector, useAuthInitialization } from '~/libs/hooks/hooks.js';
import { type RouteHandle } from '~/routes.js';

const ProtectedRoute: React.FC = () => {
    useAuthInitialization();
    const { dataStatus, user } = useAppSelector(({ auth }) => auth);
    const isAuthorized = dataStatus === DataStatus.FULFILLED && user;

    const matches = useMatches();
    const handle = matches.at(HandlerParameterIndexes.LAST_INDEX)
        ?.handle as RouteHandle;
    const { access } = handle;

    const isLoading =
        dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

    if (isLoading) {
        return <Loader backdrop={false} />;
    }

    switch (access) {
        case RouteAccess.AUTHENTICATED: {
            return isAuthorized ? (
                <Outlet />
            ) : (
                <Navigate replace to={AppRoute.RACE} />
            );
        }

        case RouteAccess.NOT_AUTHENTICATED: {
            return isAuthorized ? (
                <Navigate replace to={AppRoute.ROOT} />
            ) : (
                <Outlet />
            );
        }

        default: {
            return <Outlet />;
        }
    }
};

export { ProtectedRoute };
