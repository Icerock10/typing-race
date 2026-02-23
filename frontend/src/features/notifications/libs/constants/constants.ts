import { type ToastOptions, Zoom } from 'react-toastify';

const AUTO_CLOSE_TIME = 3000;

const DefaultNotificationOptions: Readonly<ToastOptions> = {
    autoClose: AUTO_CLOSE_TIME,
    closeOnClick: false,
    draggable: true,
    hideProgressBar: true,
    pauseOnHover: true,
    position: 'top-right',
    theme: 'colored',
    transition: Zoom,
} as const;

export { DefaultNotificationOptions };
