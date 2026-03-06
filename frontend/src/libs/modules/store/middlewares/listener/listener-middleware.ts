import {
    createListenerMiddleware,
    isAnyOf,
    isFulfilled,
    isRejected,
} from '@reduxjs/toolkit';

import { AppRoute, SuccessMessage } from '~/libs/enums/enums.js';
import { getErrorMessage } from '~/libs/helpers/helpers.js';
import { navigation } from '~/libs/modules/navigation/navigation.js';
import { actions as authActions } from '~/features/auth/auth.js';
import { notifications } from '~/features/notifications/notificationts.js';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    effect: (action) => {
        notifications.error(getErrorMessage(action));
    },
    matcher: isRejected,
});

listenerMiddleware.startListening({
    effect: async () => {
        await navigation.navigateTo(AppRoute.ROOT);
    },
    matcher: isAnyOf(
        authActions.signIn.fulfilled,
        authActions.signUp.fulfilled,
    ),
});

listenerMiddleware.startListening({
    effect: () => {
        notifications.success(SuccessMessage.SIGN_UP);
    },
    matcher: isFulfilled(authActions.signUp),
});

export { listenerMiddleware };
