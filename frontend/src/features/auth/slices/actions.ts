import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { ErrorMessage, HTTPError } from '~/libs/enums/enums.js';
import { StorageKey } from '~/libs/modules/storage/storage.js';
import {
    type AsyncThunkConfig,
    type UserDto,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
    type ServerErrorDetail,
} from '~/libs/types/types.js';

import {
    actions as authSliceActions,
    name as sliceName,
} from './auth.slice.js';

type ErrorPayload = {
    details: ServerErrorDetail[];
    message: string;
};

const displayErrorMessage = (error: unknown): ErrorPayload => {
    return error instanceof HTTPError
        ? { details: error.details, message: error.message }
        : { details: [], message: ErrorMessage.DEFAULT_ERROR_MESSAGE };
};

const updateSocketAuth = createAction<{ userId: string }>(
    `${sliceName}/update-auth`,
);

const signIn = createAsyncThunk<
    UserDto,
    UserSignInRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/sign-in`,
    async (registerPayload, { extra, rejectWithValue, dispatch }) => {
        const { authApi, storage } = extra;

        try {
            const { token, user } = await authApi.signIn(registerPayload);
            await storage.set(StorageKey.TOKEN, token);
            dispatch(updateSocketAuth({ userId: String(user.id) }));
            return user;
        } catch (error) {
            const { message } = displayErrorMessage(error);

            return rejectWithValue(message);
        }
    },
);

const signUp = createAsyncThunk<
    UserDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/sign-up`,
    async (registerPayload, { extra, rejectWithValue, dispatch }) => {
        const { authApi, storage } = extra;

        try {
            const { token, user } = await authApi.signUp(registerPayload);
            await storage.set(StorageKey.TOKEN, token);
            dispatch(updateSocketAuth({ userId: String(user.id) }));
            return user;
        } catch (error) {
            const { message } = displayErrorMessage(error);
            return rejectWithValue(message);
        }
    },
);

const getCurrentUser = createAsyncThunk<
    null | UserDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-current-user`, async (_, { extra, rejectWithValue }) => {
    const { authApi, storage } = extra;

    const token = await storage.get(StorageKey.TOKEN);

    if (!token) {
        return null;
    }

    try {
        return await authApi.getCurrentUser();
    } catch (error) {
        const { message } = displayErrorMessage(error);
        return rejectWithValue(message);
    }
});

const logout = createAsyncThunk<null, undefined, AsyncThunkConfig>(
    `${sliceName}/logout`,
    async (_payload, { dispatch, extra, rejectWithValue }) => {
        const { storage } = extra;

        try {
            await storage.drop(StorageKey.TOKEN);
        } catch {
            return rejectWithValue(ErrorMessage.DEFAULT_ERROR_MESSAGE);
        }

        dispatch(authSliceActions.resetAuthState());

        return null;
    },
);

export { getCurrentUser, logout, signIn, signUp, updateSocketAuth };
