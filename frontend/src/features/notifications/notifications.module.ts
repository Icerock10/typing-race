import { toast, type ToastOptions } from 'react-toastify';

import { DefaultNotificationOptions } from './libs/constants/constants.js';

class Notifications {
    private static setOptions(overrides?: Partial<ToastOptions>): ToastOptions {
        return { ...DefaultNotificationOptions, ...overrides } as ToastOptions;
    }

    public error(
        message: string,
        notificationOptions?: Partial<ToastOptions>,
    ): string {
        const customNotificationOptions =
            Notifications.setOptions(notificationOptions);

        return toast.error(message, customNotificationOptions).toString();
    }

    public info(
        message: string,
        notificationOptions?: Partial<ToastOptions>,
    ): string {
        const customNotificationOptions =
            Notifications.setOptions(notificationOptions);

        return toast.info(message, customNotificationOptions).toString();
    }

    public success(
        message: React.ReactNode | string,
        notificationOptions?: Partial<ToastOptions>,
    ): string {
        const customNotificationOptions =
            Notifications.setOptions(notificationOptions);

        return toast.success(message, customNotificationOptions).toString();
    }
}

export { Notifications };
