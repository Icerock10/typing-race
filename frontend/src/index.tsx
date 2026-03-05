import { type JSX, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRoute } from './libs/enums/app-route.enum.js';
import { Navigate } from 'react-router-dom';
import {
    App,
    ProtectedRoute,
    RouterProvider,
    StoreProvider,
    ErrorBoundary,
} from './libs/components/components.js';
import '~/assets/css/styles.css';

import { store } from './libs/modules/store/store.js';
import { routes } from './routes.js';

const Root = (): JSX.Element => {
    return (
        <StrictMode>
            <StoreProvider store={store.instance}>
                <ErrorBoundary>
                    <RouterProvider
                        routes={[
                            {
                                path: AppRoute.ROOT,
                                element: (
                                    <App>
                                        <ProtectedRoute />
                                    </App>
                                ),
                                children: [
                                    {
                                        index: true,
                                        element: (
                                            <Navigate
                                                to={AppRoute.LOBBY}
                                                replace
                                            />
                                        ),
                                    },
                                    ...routes,
                                ],
                            },
                        ]}
                    />
                </ErrorBoundary>
            </StoreProvider>
        </StrictMode>
    );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Root />);
