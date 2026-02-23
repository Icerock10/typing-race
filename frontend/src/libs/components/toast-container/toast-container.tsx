import React from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';

const ToastPortalContainer: React.FC = () => {
    const portalRoot = document.body;

    return createPortal(<ToastContainer />, portalRoot);
};

export { ToastPortalContainer };
