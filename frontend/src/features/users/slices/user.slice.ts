import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type UserDto, type ValueOf } from '~/libs/types/types.js';

import { getAllUsers } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    users: UserDto[];
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    users: [],
};

const { actions, name, reducer } = createSlice({
    extraReducers(builder) {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.users = action.payload;
        });
        builder.addCase(getAllUsers.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getAllUsers.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.users = [];
        });
    },
    initialState,
    name: 'users',
    reducers: {},
});

export { actions, name, reducer };
