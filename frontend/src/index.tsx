import { type JSX, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

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
                                children: routes,
                                element: (
                                    <App>
                                        <ProtectedRoute />
                                    </App>
                                ),
                                path: '/',
                            },
                        ]}
                    />
                </ErrorBoundary>
            </StoreProvider>
        </StrictMode>
    );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Root />);
