import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig, type UserDto } from '~/libs/types/types.js';

import { name as sliceName } from './user.slice.js';

const getAllUsers = createAsyncThunk<UserDto[], undefined, AsyncThunkConfig>(
    `${sliceName}/get-all`,
    async (_, { extra }) => {
        const { userApi } = extra;

        return userApi.getAll();
    },
);

export { getAllUsers };
