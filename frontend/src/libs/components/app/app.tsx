import React from 'react';

import { ToastPortalContainer } from '../toast-container/toast-container.js';

type Properties = {
    children: React.ReactNode;
};

const App: React.FC<Properties> = ({ children }: Properties) => {
    return (
        <>
            {children}
            <ToastPortalContainer />
        </>
    );
};

export { App };
