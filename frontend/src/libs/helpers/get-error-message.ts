import { type SerializedError } from '@reduxjs/toolkit';

import { ErrorMessage } from '~/libs/enums/enums.js';

type RejectedAction = {
    error: SerializedError;
    payload: unknown;
};

const getErrorMessage = (action: RejectedAction): string => {
    return typeof action.payload === 'string'
        ? action.payload
        : action.error.message?.trim() || ErrorMessage.DEFAULT_ERROR_MESSAGE;
};

export { getErrorMessage };
